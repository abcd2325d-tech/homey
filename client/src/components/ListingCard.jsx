import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { api } from "../api.js";

export default function ListingCard({ listing }) {
  const { user } = useAuth();
  const [saved, setSaved] = useState(!!listing.wishlisted);
  const [busy, setBusy] = useState(false);

  async function toggleWishlist(e) {
    e.preventDefault();
    e.stopPropagation();
    if (!user || busy) return;
    setBusy(true);
    const next = !saved;
    setSaved(next); // optimistic
    try {
      if (next) await api.addWishlist(listing.id);
      else await api.removeWishlist(listing.id);
    } catch {
      setSaved(!next); // revert on failure
    } finally {
      setBusy(false);
    }
  }

  return (
    <Link to={`/listings/${listing.id}`} className="listing-card">
      <div
        className="listing-image"
        style={{ backgroundImage: `url(${listing.imageUrl || "https://placehold.co/600x400?text=Homey"})` }}
      >
        {user && (
          <button
            className={`wishlist-heart${saved ? " saved" : ""}`}
            onClick={toggleWishlist}
            aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
            type="button"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
              <path d="M12 21s-7.5-4.9-10-9.3C.4 8.4 2 5 5.4 5c2 0 3.4 1.1 4.1 2.3.2.4.8.4 1 0C11.2 6.1 12.6 5 14.6 5 18 5 19.6 8.4 22 11.7 19.5 16.1 12 21 12 21z" />
            </svg>
          </button>
        )}
      </div>
      <div className="listing-info">
        <div className="listing-title-row">
          <span className="listing-title">{listing.title}</span>
          {listing.avgRating != null && (
            <span className="listing-rating">★ {listing.avgRating}</span>
          )}
        </div>
        <div className="listing-location">{listing.city}, {listing.country}</div>
        <div className="listing-meta">{listing.maxGuests} guests · {listing.bedrooms} bd · {listing.beds} beds</div>
        <div className="listing-price"><strong>${listing.pricePerNight}</strong> / night</div>
      </div>
    </Link>
  );
}
