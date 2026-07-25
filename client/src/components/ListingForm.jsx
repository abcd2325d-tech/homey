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
  houseRules: "",
  cancellationPolicy: "",
};

// Shrinks a photo down before it's stored, so a full-resolution phone photo
// (often 3-5MB) doesn't get sent to the server as-is. Caps the longest side
// at 1280px and re-encodes as JPEG, which keeps most photos well under 500KB.
function resizeImageFile(file, maxDimension = 1280, quality = 0.75) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Couldn't read that file"));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("That doesn't look like a valid image"));
      img.onload = () => {
        let { width, height } = img;
        if (width > height && width > maxDimension) {
          height = Math.round((height * maxDimension) / width);
          width = maxDimension;
        } else if (height > maxDimension) {
          width = Math.round((width * maxDimension) / height);
          height = maxDimension;
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        canvas.getContext("2d").drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

export default function ListingForm({ initial, onSubmit, submitLabel = "Save" }) {
  const [form, setForm] = useState(() =>
    initial
      ? { ...initial, amenities: (initial.amenities || []).join(", ") }
      : emptyForm
  );
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [photoBusy, setPhotoBusy] = useState(false);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handlePhotoChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    setPhotoBusy(true);
    try {
      const dataUrl = await resizeImageFile(file);
      update("imageUrl", dataUrl);
    } catch (err) {
      setError(err.message);
    } finally {
      setPhotoBusy(false);
    }
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
        houseRules: form.houseRules,
        cancellationPolicy: form.cancellationPolicy,
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
        House rules
        <textarea rows={3} placeholder="Check-in after 3pm, no smoking, no parties…" value={form.houseRules} onChange={(e) => update("houseRules", e.target.value)} />
      </label>
      <label>
        Cancellation policy
        <textarea rows={3} placeholder="Free cancellation up to 48 hours before check-in…" value={form.cancellationPolicy} onChange={(e) => update("cancellationPolicy", e.target.value)} />
      </label>
      <label>
        Photo
        <input type="file" accept="image/*" onChange={handlePhotoChange} />
      </label>
      {photoBusy && <p className="muted small">Processing photo…</p>}
      {form.imageUrl && !photoBusy && (
        <img src={form.imageUrl} alt="Listing preview" className="photo-preview" />
      )}
      <button className="btn-primary" type="submit" disabled={submitting || photoBusy}>
        {submitting ? "Saving…" : submitLabel}
      </button>
    </form>
  );
}
