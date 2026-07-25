import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { api } from "../api.js";
import ListingCard from "../components/ListingCard.jsx";

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [city, setCity] = useState(searchParams.get("city") || "");
  const [checkIn, setCheckIn] = useState(searchParams.get("checkIn") || "");
  const [checkOut, setCheckOut] = useState(searchParams.get("checkOut") || "");
  const [guests, setGuests] = useState(searchParams.get("guests") || "");

  useEffect(() => {
    setLoading(true);
    setError("");
    const params = Object.fromEntries(searchParams.entries());
    api
      .listListings(params)
      .then((data) => setListings(data.listings))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [searchParams]);

  function handleSearch(e) {
    e.preventDefault();
    const params = {};
    if (city) params.city = city;
    if (checkIn) params.checkIn = checkIn;
    if (checkOut) params.checkOut = checkOut;
    if (guests) params.guests = guests;
    setSearchParams(params);
  }

  return (
    <div className="page">
      <form className="search-bar" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Where to?"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
        <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
        <input
          type="number"
          min="1"
          placeholder="Guests"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
        />
        <button type="submit" className="btn-primary">Search</button>
      </form>

      {loading && <p className="muted">Loading stays…</p>}
      {error && <p className="error-text">{error}</p>}
      {!loading && !error && listings.length === 0 && (
        <p className="muted">No listings match your search. Try different dates or a different place.</p>
      )}

      <div className="listing-grid">
        {listings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </div>
  );
}
