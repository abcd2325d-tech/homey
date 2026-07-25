import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api.js";

export default function Messages() {
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .messageThreads()
      .then((data) => setThreads(data.threads))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page">
      <h1>Messages</h1>
      {loading && <p className="muted">Loading…</p>}
      {error && <p className="error-text">{error}</p>}
      {!loading && threads.length === 0 && (
        <p className="muted">No conversations yet — messages tied to a booking will show up here.</p>
      )}
      <div className="thread-list">
        {threads.map((t) => (
          <Link to={`/messages/${t.bookingId}`} key={t.bookingId} className="thread-row">
            <div className="thread-avatar">{t.otherName.slice(0, 1).toUpperCase()}</div>
            <div className="thread-info">
              <div className="thread-top">
                <strong>{t.otherName}</strong>
                <span className="muted small">{t.otherRole === "host" ? "Host" : "Guest"}</span>
              </div>
              <div className="muted small">{t.listingTitle}</div>
              <div className="thread-preview">{t.lastMessage || "No messages yet"}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
