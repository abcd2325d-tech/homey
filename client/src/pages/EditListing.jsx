import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../api.js";
import ListingForm from "../components/ListingForm.jsx";

export default function EditListing() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .getListing(id)
      .then((data) => setListing(data.listing))
      .catch((err) => setError(err.message));
  }, [id]);

  async function handleUpdate(payload) {
    await api.updateListing(id, payload);
    navigate(`/listings/${id}`);
  }

  return (
    <div className="page narrow">
      <h1>Edit listing</h1>
      {error && <p className="error-text">{error}</p>}
      {listing && <ListingForm initial={listing} onSubmit={handleUpdate} submitLabel="Save changes" />}
    </div>
  );
}
