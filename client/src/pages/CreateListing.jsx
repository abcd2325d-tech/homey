import { useNavigate } from "react-router-dom";
import { api } from "../api.js";
import ListingForm from "../components/ListingForm.jsx";

export default function CreateListing() {
  const navigate = useNavigate();

  async function handleCreate(payload) {
    const data = await api.createListing(payload);
    navigate(`/listings/${data.listing.id}`);
  }

  return (
    <div className="page narrow">
      <h1>Create a new listing</h1>
      <ListingForm onSubmit={handleCreate} submitLabel="Publish listing" />
    </div>
  );
}
