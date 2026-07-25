import { useState } from "react";

const emptyForm = {
  title: "",
  description: "",
  city: "",
  country: "",
  pricePerNight: "",
  maxGuests: 2,
  bedrooms: 1,
  beds: 1,
  baths: 1,
  amenities: "",
  imageUrl: "",
};

export default function ListingForm({ initial, onSubmit, submitLabel = "Save" }) {
  const [form, setForm] = useState(() =>
    initial
      ? { ...initial, amenities: (initial.amenities || []).join(", ") }
      : emptyForm
  );
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await onSubmit({
        title: form.title,
        description: form.description,
        city: form.city,
        country: form.country,
        pricePerNight: Number(form.pricePerNight),
        maxGuests: Number(form.maxGuests),
        bedrooms: Number(form.bedrooms),
        beds: Number(form.beds),
        baths: Number(form.baths),
        amenities: form.amenities
          .split(",")
          .map((a) => a.trim())
          .filter(Boolean),
        imageUrl: form.imageUrl,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="listing-form" onSubmit={handleSubmit}>
      {error && <p className="error-text">{error}</p>}
      <label>
        Title
        <input required value={form.title} onChange={(e) => update("title", e.target.value)} />
      </label>
      <label>
        Description
        <textarea rows={4} value={form.description} onChange={(e) => update("description", e.target.value)} />
      </label>
      <div className="form-row">
        <label>
          City
          <input required value={form.city} onChange={(e) => update("city", e.target.value)} />
        </label>
        <label>
          Country
          <input required value={form.country} onChange={(e) => update("country", e.target.value)} />
        </label>
      </div>
      <div className="form-row">
        <label>
          Price / night ($)
          <input required type="number" min="1" step="0.01" value={form.pricePerNight} onChange={(e) => update("pricePerNight", e.target.value)} />
        </label>
        <label>
          Max guests
          <input required type="number" min="1" value={form.maxGuests} onChange={(e) => update("maxGuests", e.target.value)} />
        </label>
      </div>
      <div className="form-row three">
        <label>
          Bedrooms
          <input type="number" min="0" value={form.bedrooms} onChange={(e) => update("bedrooms", e.target.value)} />
        </label>
        <label>
          Beds
          <input type="number" min="0" value={form.beds} onChange={(e) => update("beds", e.target.value)} />
        </label>
        <label>
          Baths
          <input type="number" min="0" value={form.baths} onChange={(e) => update("baths", e.target.value)} />
        </label>
      </div>
      <label>
        Amenities (comma separated)
        <input placeholder="Wifi, Kitchen, Pool" value={form.amenities} onChange={(e) => update("amenities", e.target.value)} />
      </label>
      <label>
        Image URL
        <input placeholder="https://…" value={form.imageUrl} onChange={(e) => update("imageUrl", e.target.value)} />
      </label>
      <button className="btn-primary" type="submit" disabled={submitting}>
        {submitting ? "Saving…" : submitLabel}
      </button>
    </form>
  );
}
