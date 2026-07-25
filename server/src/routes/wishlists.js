import { Router } from "express";
import db from "../db.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

function serializeListing(listing) {
  return {
    id: listing.id,
    hostId: listing.host_id,
    title: listing.title,
    city: listing.city,
    country: listing.country,
    pricePerNight: listing.price_per_night,
    maxGuests: listing.max_guests,
    bedrooms: listing.bedrooms,
    beds: listing.beds,
    imageUrl: listing.image_url,
  };
}

router.get("/mine", requireAuth, (req, res) => {
  const rows = db
    .prepare(
      `SELECT l.* FROM wishlists w
       JOIN listings l ON l.id = w.listing_id
       WHERE w.user_id = ? ORDER BY w.created_at DESC`
    )
    .all(req.user.id);
  res.json({ listings: rows.map(serializeListing) });
});

router.post("/:listingId", requireAuth, (req, res) => {
  const listing = db.prepare("SELECT id FROM listings WHERE id = ?").get(req.params.listingId);
  if (!listing) return res.status(404).json({ error: "Listing not found" });

  try {
    db.prepare("INSERT INTO wishlists (user_id, listing_id) VALUES (?, ?)").run(req.user.id, listing.id);
  } catch {
    // already wishlisted — treat as success (idempotent)
  }
  res.status(201).json({ ok: true });
});

router.delete("/:listingId", requireAuth, (req, res) => {
  db.prepare("DELETE FROM wishlists WHERE user_id = ? AND listing_id = ?").run(req.user.id, req.params.listingId);
  res.json({ ok: true });
});

export default router;
