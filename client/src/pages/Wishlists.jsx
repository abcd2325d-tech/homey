import { useEffect, useState } from "react";
import { api } from "../api.js";
import ListingCard from "../components/ListingCard.jsx";

export default function Wishlists() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .myWishlist()
      .then((data) => setListings(data.listings))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page">
      <h1>Wishlists</h1>
      {loading && <p className="muted">Loading…</p>}
      {error && <p className="error-text">{error}</p>}
      {!loading && listings.length === 0 && (
        <p className="muted">Nothing saved yet — tap the heart on a listing to save it here.</p>
      )}
      <div className="listing-grid">
        {listings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </div>
  );
}
