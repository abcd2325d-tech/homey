import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../api.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function MessageThread() {
  const { bookingId } = useParams();
  const { user } = useAuth();
  const [listingTitle, setListingTitle] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef(null);

  function load() {
    api
      .getThread(bookingId)
      .then((data) => {
        setListingTitle(data.listingTitle);
        setMessages(data.messages);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }

  useEffect(load, [bookingId]);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: "end" });
  }, [messages]);

  async function handleSend(e) {
    e.preventDefault();
    if (!draft.trim()) return;
    setSending(true);
    try {
      await api.sendMessage(bookingId, draft.trim());
      setDraft("");
      load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="page narrow thread-page">
      <Link to="/messages" className="muted small">← Back to messages</Link>
      <h1>{listingTitle || "Conversation"}</h1>
      {loading && <p className="muted">Loading…</p>}
      {error && <p className="error-text">{error}</p>}

      <div className="thread-messages">
        {messages.map((m) => (
          <div key={m.id} className={`message-bubble${m.sender_id === user?.id ? " mine" : ""}`}>
            <div className="message-body">{m.body}</div>
            <div className="message-meta">{m.sender_name}</div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <form className="message-composer" onSubmit={handleSend}>
        <input
          placeholder="Type a message…"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
        />
        <button className="btn-primary" type="submit" disabled={sending || !draft.trim()}>
          Send
        </button>
      </form>
    </div>
  );
}
