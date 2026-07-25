import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const icons = {
  explore: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  heart: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 21s-7.5-4.9-10-9.3C.4 8.4 2 5 5.4 5c2 0 3.4 1.1 4.1 2.3.2.4.8.4 1 0C11.2 6.1 12.6 5 14.6 5 18 5 19.6 8.4 22 11.7 19.5 16.1 12 21 12 21z" />
    </svg>
  ),
  trips: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  ),
  messages: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  profile: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  ),
};

function Tab({ to, icon, label }) {
  return (
    <NavLink to={to} className={({ isActive }) => `bottom-nav-tab${isActive ? " active" : ""}`}>
      {icons[icon]}
      <span>{label}</span>
    </NavLink>
  );
}

export default function BottomNav() {
  const { user } = useAuth();

  return (
    <nav className="bottom-nav" aria-label="Primary">
      <Tab to="/" icon="explore" label="Explore" />
      <Tab to="/wishlists" icon="heart" label="Wishlists" />
      <Tab to="/trips" icon="trips" label="Trips" />
      <Tab to="/messages" icon="messages" label="Messages" />
      <Tab to={user ? "/profile" : "/login"} icon="profile" label="Profile" />
    </nav>
  );
}
