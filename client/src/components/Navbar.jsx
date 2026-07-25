import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="navbar">
      <Link to="/" className="brand">homey</Link>
      <nav className="nav-links">
        {user ? (
          <>
            {user.isHost && <Link to="/host">Host dashboard</Link>}
            <Link to="/trips">My trips</Link>
            <span className="nav-user">Hi, {user.name.split(" ")[0]}</span>
            <button
              className="btn-link"
              onClick={() => {
                logout();
                navigate("/");
              }}
            >
              Log out
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Log in</Link>
            <Link to="/signup" className="btn-primary-sm">Sign up</Link>
          </>
        )}
      </nav>
    </header>
  );
}
