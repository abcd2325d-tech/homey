import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api.js";

export default function MyTrips() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
