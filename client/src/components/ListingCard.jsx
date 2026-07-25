import { Link } from "react-router-dom";

export default function ListingCard({ listing }) {
  return (
    <Link to={`/listings/${listing.id}`} className="listing-card">
      <div
        className="listing-image"
        style={{ backgroundImage: `url(${listing.imageUrl || "https://placehold.co/600x400?text=Homey"})` }}
      />
      <div className="listing-info">
        <div className="listing-title-row">
          <span className="listing-title">{listing.title}</span>
        </div>
        <div className="listing-location">{listing.city}, {listing.country}</div>
        <div className="listing-meta">{listing.maxGuests} guests · {listing.bedrooms} bd · {listing.beds} beds</div>
        <div className="listing-price"><strong>${listing.pricePerNight}</strong> / night</div>
      </div>
    </Link>
  );
}
