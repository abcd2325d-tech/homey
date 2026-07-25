import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api.js";

function ReviewForm({ bookingId, onDone }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await api.leaveReview(bookingId, { rating: Number(rating), comment });
      onDone();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      {error && <p className="error-text">{error}</p>}
      <label>
        Rating
        <select value={rating} onChange={(e) => setRating(e.target.value)}>
          {[5, 4, 3, 2, 1].map((n) => (
            <option key={n} value={n}>{n} star{n === 1 ? "" : "s"}</option>
          ))}
        </select>
      </label>
      <textarea
        rows={2}
        placeholder="How was your stay?"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button className="btn-primary-sm" type="submit" disabled={submitting}>
        {submitting ? "Submitting…" : "Submit review"}
      </button>
    </form>
  );
}

export default function MyTrips() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reviewingId, setReviewingId] = useState(null);

  function load() {
    setLoading(true);
    api
      .myBookings()
      .then((data) => setBookings(data.bookings))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function handleCancel(id) {
    if (!confirm("Cancel this booking?")) return;
    try {
      await api.cancelBooking(id);
      load();
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="page">
      <h1>My trips</h1>
      {loading && <p className="muted">Loading…</p>}
      {error && <p className="error-text">{error}</p>}
      {!loading && bookings.length === 0 && <p className="muted">No trips booked yet — go find a place to stay!</p>}

      <div className="trip-list">
        {bookings.map((b) => (
          <div className="trip-row" key={b.id}>
            <img src={b.listing_image || "https://placehold.co/120x90?text=Homey"} alt={b.listing_title} />
            <div className="trip-info">
              <Link to={`/listings/${b.listing_id}`}><strong>{b.listing_title}</strong></Link>
              <span className="muted small">{b.listing_city}</span>
              <span className="muted small">{b.check_in} → {b.check_out} · {b.guests} guests</span>
              <span className={`status-badge status-${b.status}`}>{b.status}</span>
              <div className="trip-actions">
                <Link to={`/messages/${b.id}`} className="muted small">Message host</Link>
                {b.status === "confirmed" && !b.has_review && (
                  <button
                    className="btn-link"
                    onClick={() => setReviewingId(reviewingId === b.id ? null : b.id)}
                  >
                    Leave a review
                  </button>
                )}
                {b.has_review && <span className="muted small">✓ Reviewed</span>}
              </div>
              {reviewingId === b.id && (
                <ReviewForm
                  bookingId={b.id}
                  onDone={() => {
                    setReviewingId(null);
                    load();
                  }}
                />
              )}
            </div>
            <div className="trip-price">
              <strong>${b.total_price}</strong>
              {b.status === "confirmed" && (
                <button className="btn-link danger" onClick={() => handleCancel(b.id)}>Cancel</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
