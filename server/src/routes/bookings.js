import { Router } from "express";
import crypto from "crypto";
import db from "../db.js";
import { requireAuth } from "../middleware/auth.js";
import { bookingSchema, reviewSchema, validate } from "../utils/validators.js";

const router = Router();

function nightsBetween(checkIn, checkOut) {
  const inDate = new Date(checkIn);
  const outDate = new Date(checkOut);
  const ms = outDate - inDate;
  return Math.round(ms / (1000 * 60 * 60 * 24));
}

// Simulated payment processor. No real money moves; this mimics a
// payment gateway response so the flow can later be swapped for Stripe.
function processMockPayment({ number, expiry, cvc }) {
  const digits = number.replace(/\s+/g, "");
  if (!/^\d{12,19}$/.test(digits)) {
    return { success: false, reason: "Card number is invalid" };
  }
  if (!/^\d{2}\/\d{2}$/.test(expiry)) {
    return { success: false, reason: "Expiry must be in MM/YY format" };
  }
  const [mm, yy] = expiry.split("/").map(Number);
  const now = new Date();
  const expDate = new Date(2000 + yy, mm - 1, 1);
  const currentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  if (mm < 1 || mm > 12 || expDate < currentMonth) {
    return { success: false, reason: "Card has expired" };
  }
  if (!/^\d{3,4}$/.test(cvc)) {
    return { success: false, reason: "CVC is invalid" };
  }
  // Test card number ending in 0000 is used to simulate a decline.
  if (digits.endsWith("0000")) {
    return { success: false, reason: "Card was declined" };
  }
  return { success: true, ref: `MOCK-${crypto.randomBytes(6).toString("hex").toUpperCase()}` };
}

router.post("/", requireAuth, validate(bookingSchema), (req, res) => {
  const { listingId, checkIn, checkOut, guests, card } = req.validated;

  const listing = db.prepare("SELECT * FROM listings WHERE id = ?").get(listingId);
  if (!listing) return res.status(404).json({ error: "Listing not found" });
  if (listing.host_id === req.user.id) {
    return res.status(400).json({ error: "Hosts cannot book their own listing" });
  }

  const nights = nightsBetween(checkIn, checkOut);
  if (nights <= 0) return res.status(400).json({ error: "Check-out must be after check-in" });
  if (guests > listing.max_guests) {
    return res.status(400).json({ error: `This listing sleeps a maximum of ${listing.max_guests} guests` });
  }

  const conflict = db
    .prepare(
      `SELECT id FROM bookings WHERE listing_id = ? AND status != 'cancelled'
       AND NOT (check_out <= ? OR check_in >= ?)`
    )
    .get(listingId, checkIn, checkOut);
  if (conflict) return res.status(409).json({ error: "Listing is not available for the selected dates" });

  const totalPrice = Math.round(nights * listing.price_per_night * 100) / 100;

  const payment = processMockPayment(card);
  if (!payment.success) {
    return res.status(402).json({ error: `Payment failed: ${payment.reason}` });
  }

  const info = db
    .prepare(
      `INSERT INTO bookings (listing_id, guest_id, check_in, check_out, guests, total_price, status, payment_ref)
       VALUES (?, ?, ?, ?, ?, ?, 'confirmed', ?)`
    )
    .run(listingId, req.user.id, checkIn, checkOut, guests, totalPrice, payment.ref);

  const booking = db.prepare("SELECT * FROM bookings WHERE id = ?").get(info.lastInsertRowid);
  res.status(201).json({ booking: { ...booking, listing: listing.title }, paymentRef: payment.ref });
});

router.get("/mine", requireAuth, (req, res) => {
  const rows = db
    .prepare(
      `SELECT b.*, l.title AS listing_title, l.city AS listing_city, l.image_url AS listing_image,
              (SELECT COUNT(*) FROM reviews r WHERE r.booking_id = b.id) AS has_review
       FROM bookings b JOIN listings l ON l.id = b.listing_id
       WHERE b.guest_id = ? ORDER BY b.created_at DESC`
    )
    .all(req.user.id);
  res.json({ bookings: rows.map((b) => ({ ...b, has_review: !!b.has_review })) });
});

// Bookings made by guests on listings this host owns — lets a host see who
// booked their places so they know who they can message.
router.get("/host", requireAuth, (req, res) => {
  const rows = db
    .prepare(
      `SELECT b.*, l.title AS listing_title, u.name AS guest_name
       FROM bookings b
       JOIN listings l ON l.id = b.listing_id
       JOIN users u ON u.id = b.guest_id
       WHERE l.host_id = ? ORDER BY b.created_at DESC`
    )
    .all(req.user.id);
  res.json({ bookings: rows });
});

router.post("/:id/cancel", requireAuth, (req, res) => {
  const booking = db.prepare("SELECT * FROM bookings WHERE id = ?").get(req.params.id);
  if (!booking) return res.status(404).json({ error: "Booking not found" });
  if (booking.guest_id !== req.user.id) return res.status(403).json({ error: "Not your booking" });

  db.prepare("UPDATE bookings SET status = 'cancelled' WHERE id = ?").run(booking.id);
  res.json({ ok: true });
});

router.post("/:id/review", requireAuth, validate(reviewSchema), (req, res) => {
  const booking = db.prepare("SELECT * FROM bookings WHERE id = ?").get(req.params.id);
  if (!booking) return res.status(404).json({ error: "Booking not found" });
  if (booking.guest_id !== req.user.id) return res.status(403).json({ error: "Not your booking" });

  const existing = db.prepare("SELECT id FROM reviews WHERE booking_id = ?").get(booking.id);
  if (existing) return res.status(409).json({ error: "You already reviewed this stay" });

  const { rating, comment } = req.validated;
  db.prepare(
    "INSERT INTO reviews (booking_id, listing_id, guest_id, rating, comment) VALUES (?, ?, ?, ?, ?)"
  ).run(booking.id, booking.listing_id, req.user.id, rating, comment);

  res.status(201).json({ ok: true });
});

export default router;
