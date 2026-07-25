import { Router } from "express";
import db from "../db.js";
import { requireAuth, optionalAuth } from "../middleware/auth.js";
import { listingSchema, validate } from "../utils/validators.js";

const router = Router();

function serialize(listing) {
  return {
    id: listing.id,
    hostId: listing.host_id,
    title: listing.title,
    description: listing.description,
    city: listing.city,
    country: listing.country,
    pricePerNight: listing.price_per_night,
    maxGuests: listing.max_guests,
    bedrooms: listing.bedrooms,
    beds: listing.beds,
    baths: listing.baths,
    amenities: JSON.parse(listing.amenities || "[]"),
    imageUrl: listing.image_url,
    createdAt: listing.created_at,
  };
}

// GET /api/listings?city=&guests=&checkIn=&checkOut=&minPrice=&maxPrice=
router.get("/", (req, res) => {
  const { city, guests, checkIn, checkOut, minPrice, maxPrice } = req.query;
  let sql = "SELECT * FROM listings WHERE 1=1";
  const params = [];

  if (city) {
    sql += " AND (city LIKE ? OR country LIKE ?)";
    params.push(`%${city}%`, `%${city}%`);
  }
  if (guests) {
    sql += " AND max_guests >= ?";
    params.push(Number(guests));
  }
  if (minPrice) {
    sql += " AND price_per_night >= ?";
    params.push(Number(minPrice));
  }
  if (maxPrice) {
    sql += " AND price_per_night <= ?";
    params.push(Number(maxPrice));
  }
  if (checkIn && checkOut) {
    sql += ` AND id NOT IN (
      SELECT listing_id FROM bookings
      WHERE status != 'cancelled'
      AND NOT (check_out <= ? OR check_in >= ?)
    )`;
    params.push(checkIn, checkOut);
  }
  sql += " ORDER BY created_at DESC";

  const rows = db.prepare(sql).all(...params);
  res.json({ listings: rows.map(serialize) });
});

router.get("/mine", requireAuth, (req, res) => {
  const rows = db.prepare("SELECT * FROM listings WHERE host_id = ? ORDER BY created_at DESC").all(req.user.id);
  res.json({ listings: rows.map(serialize) });
});

router.get("/:id", (req, res) => {
  const listing = db.prepare("SELECT * FROM listings WHERE id = ?").get(req.params.id);
  if (!listing) return res.status(404).json({ error: "Listing not found" });

  const bookings = db
    .prepare("SELECT check_in, check_out FROM bookings WHERE listing_id = ? AND status != 'cancelled'")
    .all(listing.id);

  res.json({ listing: serialize(listing), unavailable: bookings });
});

router.post("/", requireAuth, validate(listingSchema), (req, res) => {
  const d = req.validated;
  const info = db
    .prepare(
      `INSERT INTO listings
        (host_id, title, description, city, country, price_per_night, max_guests, bedrooms, beds, baths, amenities, image_url)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .run(
      req.user.id,
      d.title,
      d.description,
      d.city,
      d.country,
      d.pricePerNight,
      d.maxGuests,
      d.bedrooms,
      d.beds,
      d.baths,
      JSON.stringify(d.amenities),
      d.imageUrl
    );
  const listing = db.prepare("SELECT * FROM listings WHERE id = ?").get(info.lastInsertRowid);
  res.status(201).json({ listing: serialize(listing) });
});

router.put("/:id", requireAuth, validate(listingSchema), (req, res) => {
  const listing = db.prepare("SELECT * FROM listings WHERE id = ?").get(req.params.id);
  if (!listing) return res.status(404).json({ error: "Listing not found" });
  if (listing.host_id !== req.user.id) return res.status(403).json({ error: "Not your listing" });

  const d = req.validated;
  db.prepare(
    `UPDATE listings SET title=?, description=?, city=?, country=?, price_per_night=?, max_guests=?, bedrooms=?, beds=?, baths=?, amenities=?, image_url=?
     WHERE id = ?`
  ).run(
    d.title,
    d.description,
    d.city,
    d.country,
    d.pricePerNight,
    d.maxGuests,
    d.bedrooms,
    d.beds,
    d.baths,
    JSON.stringify(d.amenities),
    d.imageUrl,
    listing.id
  );
  const updated = db.prepare("SELECT * FROM listings WHERE id = ?").get(listing.id);
  res.json({ listing: serialize(updated) });
});

router.delete("/:id", requireAuth, (req, res) => {
  const listing = db.prepare("SELECT * FROM listings WHERE id = ?").get(req.params.id);
  if (!listing) return res.status(404).json({ error: "Listing not found" });
  if (listing.host_id !== req.user.id) return res.status(403).json({ error: "Not your listing" });

  db.prepare("DELETE FROM listings WHERE id = ?").run(listing.id);
  res.status(204).send();
});

export default router;
