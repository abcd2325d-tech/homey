import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api.js";

export default function HostDashboard() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  function load() {
    setLoading(true);
    api
      .myListings()
      .then((data) => setListings(data.listings))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function handleDelete(id) {
    if (!confirm("Delete this listing? This cannot be undone.")) return;
    try {
      await api.deleteListing(id);
      setListings((prev) => prev.filter((l) => l.id !== id));
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="page">
      <div className="page-header-row">
        <h1>Your listings</h1>
        <Link to="/host/new" className="btn-primary">+ New listing</Link>
      </div>

      {loading && <p className="muted">Loading…</p>}
      {error && <p className="error-text">{error}</p>}
      {!loading && listings.length === 0 && <p className="muted">You haven't listed any places yet.</p>}

      <div className="host-listing-list">
        {listings.map((l) => (
          <div className="host-listing-row" key={l.id}>
            <img src={l.imageUrl || "https://placehold.co/120x90?text=Homey"} alt={l.title} />
            <div className="host-listing-info">
              <strong>{l.title}</strong>
              <span className="muted small">{l.city}, {l.country} · ${l.pricePerNight}/night</span>
            </div>
            <div className="host-listing-actions">
              <Link to={`/listings/${l.id}`}>View</Link>
              <Link to={`/host/edit/${l.id}`}>Edit</Link>
              <button className="btn-link danger" onClick={() => handleDelete(l.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
