import { Router } from "express";
import db from "../db.js";
import { requireAuth } from "../middleware/auth.js";
import { messageSchema, validate } from "../utils/validators.js";

const router = Router();

// A user can access a booking's thread if they're the guest who booked it,
// or the host of the listing that booking is for.
function loadAccessibleBooking(bookingId, userId) {
  const booking = db
    .prepare(
      `SELECT b.*, l.host_id AS listing_host_id, l.title AS listing_title
       FROM bookings b JOIN listings l ON l.id = b.listing_id
       WHERE b.id = ?`
    )
    .get(bookingId);
  if (!booking) return null;
  if (booking.guest_id !== userId && booking.listing_host_id !== userId) return null;
  return booking;
}

// All threads (one per booking) the current user is part of, as guest or host,
// each with the other party's name, the listing title, and the last message.
router.get("/threads", requireAuth, (req, res) => {
  const rows = db
    .prepare(
      `SELECT b.id AS booking_id, b.check_in, b.check_out, l.title AS listing_title,
              CASE WHEN b.guest_id = ? THEN host.name ELSE guest.name END AS other_name,
              CASE WHEN b.guest_id = ? THEN 'host' ELSE 'guest' END AS other_role
       FROM bookings b
       JOIN listings l ON l.id = b.listing_id
       JOIN users guest ON guest.id = b.guest_id
       JOIN users host ON host.id = l.host_id
       WHERE b.guest_id = ? OR l.host_id = ?
       ORDER BY b.id DESC`
    )
    .all(req.user.id, req.user.id, req.user.id, req.user.id);

  const threads = rows.map((row) => {
    // Order by id (not created_at) since SQLite's datetime('now') only has
    // second resolution — two messages in the same second would otherwise
    // tie and could sort in either order.
    const last = db
      .prepare("SELECT body, sender_id, created_at FROM messages WHERE booking_id = ? ORDER BY id DESC LIMIT 1")
      .get(row.booking_id);
    const unread = false; // read-state tracking is out of scope for this demo
    return {
      bookingId: row.booking_id,
      listingTitle: row.listing_title,
      otherName: row.other_name,
      otherRole: row.other_role,
      checkIn: row.check_in,
      checkOut: row.check_out,
      lastMessage: last ? last.body : null,
      lastMessageAt: last ? last.created_at : null,
      unread,
    };
  });

  res.json({ threads });
});

router.get("/:bookingId", requireAuth, (req, res) => {
  const booking = loadAccessibleBooking(req.params.bookingId, req.user.id);
  if (!booking) return res.status(404).json({ error: "Conversation not found" });

  const rows = db
    .prepare(
      `SELECT m.id, m.body, m.created_at, m.sender_id, u.name AS sender_name
       FROM messages m JOIN users u ON u.id = m.sender_id
       WHERE m.booking_id = ? ORDER BY m.id ASC`
    )
    .all(booking.id);

  res.json({
    listingTitle: booking.listing_title,
    messages: rows,
  });
});

router.post("/:bookingId", requireAuth, validate(messageSchema), (req, res) => {
  const booking = loadAccessibleBooking(req.params.bookingId, req.user.id);
  if (!booking) return res.status(404).json({ error: "Conversation not found" });

  const info = db
    .prepare("INSERT INTO messages (booking_id, sender_id, body) VALUES (?, ?, ?)")
    .run(booking.id, req.user.id, req.validated.body);

  const message = db.prepare("SELECT * FROM messages WHERE id = ?").get(info.lastInsertRowid);
  res.status(201).json({ message });
});

export default router;
