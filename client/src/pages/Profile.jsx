import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <div className="page narrow">
      <h1>Profile</h1>

      <div className="profile-card">
        <div className="profile-avatar">{user.name.slice(0, 1).toUpperCase()}</div>
        <div>
          <strong>{user.name}</strong>
          <div className="muted small">{user.email}</div>
        </div>
      </div>

      {user.isHost ? (
        <Link to="/host" className="profile-row">
          <span>Host dashboard</span>
          <span className="muted">Manage your listings →</span>
        </Link>
      ) : (
        <div className="profile-row">
          <span>Become a host</span>
          <span className="muted small">Sign up again with hosting enabled to list a place.</span>
        </div>
      )}

      <Link to="/trips" className="profile-row">
        <span>My trips</span>
        <span className="muted">→</span>
      </Link>
      <Link to="/wishlists" className="profile-row">
        <span>Wishlists</span>
        <span className="muted">→</span>
      </Link>
      <Link to="/messages" className="profile-row">
        <span>Messages</span>
        <span className="muted">→</span>
      </Link>

      <button
        className="btn-primary"
        style={{ marginTop: 24 }}
        onClick={() => {
          logout();
          navigate("/");
        }}
      >
        Log out
      </button>
    </div>
  );
}
