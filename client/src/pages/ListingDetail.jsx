import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../api.js";
import { useAuth } from "../context/AuthContext.jsx";

function nightsBetween(a, b) {
  if (!a || !b) return 0;
  const ms = new Date(b) - new Date(a);
  return Math.round(ms / (1000 * 60 * 60 * 24));
}

export default function ListingDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [listing, setListing] = useState(null);
  const [unavailable, setUnavailable] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [showCheckout, setShowCheckout] = useState(false);

  const [card, setCard] = useState({ number: "", expiry: "", cvc: "", name: "" });
  const [bookingError, setBookingError] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setLoading(true);
    api
      .getListing(id)
      .then((data) => {
        setListing(data.listing);
        setUnavailable(data.unavailable);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const nights = useMemo(() => nightsBetween(checkIn, checkOut), [checkIn, checkOut]);
  const total = listing && nights > 0 ? Math.round(nights * listing.pricePerNight * 100) / 100 : 0;

  function handleReserveClick() {
    setBookingError("");
    if (!user) {
      navigate("/login", { state: { from: `/listings/${id}` } });
      return;
    }
    if (!checkIn || !checkOut) {
      setBookingError("Please choose check-in and check-out dates");
      return;
    }
    if (nights <= 0) {
      setBookingError("Check-out must be after check-in");
      return;
    }
    setShowCheckout(true);
  }

  async function handlePay(e) {
    e.preventDefault();
    setBookingError("");
    setSubmitting(true);
    try {
      const data = await api.createBooking({
        listingId: listing.id,
        checkIn,
        checkOut,
        guests: Number(guests),
        card,
      });
      setBookingSuccess(data);
      setShowCheckout(false);
    } catch (err) {
      setBookingError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return <div className="page"><p className="muted">Loading…</p></div>;
  if (error) return <div className="page"><p className="error-text">{error}</p></div>;
  if (!listing) return null;

  return (
    <div className="page listing-detail">
      <div
        className="detail-hero"
        style={{ backgroundImage: `url(${listing.imageUrl || "https://placehold.co/1200x500?text=Homey"})` }}
      />
      <div className="detail-body">
        <div className="detail-main">
          <h1>{listing.title}</h1>
          <p className="listing-location">{listing.city}, {listing.country}</p>
          <p className="listing-meta">
            {listing.maxGuests} guests · {listing.bedrooms} bedrooms · {listing.beds} beds · {listing.baths} baths
          </p>
          <p className="detail-description">{listing.description}</p>
          {listing.amenities.length > 0 && (
            <div className="amenities">
              <h3>What this place offers</h3>
              <ul>
                {listing.amenities.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <aside className="booking-card">
          {bookingSuccess ? (
            <div className="booking-success">
              <h3>Booking confirmed 🎉</h3>
              <p>Payment ref: <code>{bookingSuccess.paymentRef}</code></p>
              <p>{checkIn} → {checkOut} · {nights} nights · ${bookingSuccess.booking.total_price} total</p>
              <button className="btn-primary" onClick={() => navigate("/trips")}>View my trips</button>
            </div>
          ) : !showCheckout ? (
            <>
              <div className="price-row"><strong>${listing.pricePerNight}</strong> / night</div>
              <label>
                Check-in
                <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
              </label>
              <label>
                Check-out
                <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
              </label>
              <label>
                Guests
                <input
                  type="number"
                  min="1"
                  max={listing.maxGuests}
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                />
              </label>
              {bookingError && <p className="error-text">{bookingError}</p>}
              {nights > 0 && (
                <div className="price-breakdown">
                  <div>${listing.pricePerNight} × {nights} nights</div>
                  <div><strong>${total}</strong></div>
                </div>
              )}
              <button className="btn-primary" onClick={handleReserveClick}>Reserve</button>
              <p className="muted small">You won't be charged yet</p>
            </>
          ) : (
            <form className="checkout-form" onSubmit={handlePay}>
              <h3>Confirm and pay</h3>
              <p className="muted small">{checkIn} → {checkOut} · {nights} nights · ${total} total</p>
              {bookingError && <p className="error-text">{bookingError}</p>}
              <label>
                Cardholder name
                <input required value={card.name} onChange={(e) => setCard({ ...card, name: e.target.value })} />
              </label>
              <label>
                Card number
                <input
                  required
                  placeholder="4242 4242 4242 4242"
                  value={card.number}
                  onChange={(e) => setCard({ ...card, number: e.target.value })}
                />
              </label>
              <div className="card-row">
                <label>
                  Expiry (MM/YY)
                  <input
                    required
                    placeholder="12/29"
                    value={card.expiry}
                    onChange={(e) => setCard({ ...card, expiry: e.target.value })}
                  />
                </label>
                <label>
                  CVC
                  <input required value={card.cvc} onChange={(e) => setCard({ ...card, cvc: e.target.value })} />
                </label>
              </div>
              <p className="muted small">This is a simulated payment. No real card is charged. Use a number ending in 0000 to test a decline.</p>
              <button className="btn-primary" type="submit" disabled={submitting}>
                {submitting ? "Processing…" : `Pay $${total}`}
              </button>
              <button type="button" className="btn-link" onClick={() => setShowCheckout(false)}>Back</button>
            </form>
          )}
        </aside>
      </div>
    </div>
  );
}
