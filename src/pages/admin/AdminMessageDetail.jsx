import { useState, useEffect } from "react";
import "./AdminMessageDetail.css";

const AdminMessageDetail = ({ token, messageId, onNavigate }) => {
  const [message,   setMessage]   = useState(null);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState("");
  const [replyBody, setReplyBody] = useState("");
  const [sending,   setSending]   = useState(false);
  const [replyDone, setReplyDone] = useState(false);
  const [actionMsg, setActionMsg] = useState("");

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const res  = await fetch(
          `http://localhost:5000/api/admin/messages/${messageId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const json = await res.json();
        if (res.ok) setMessage(json.data.message);
        else setError(json.message);
      } catch {
        setError("Failed to load message.");
      } finally {
        setLoading(false);
      }
    };
    fetchMessage();
  }, [token, messageId]);

  const handleStatusChange = async (status) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/admin/messages/${messageId}/status`,
        {
          method:  "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization:  `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );
      const json = await res.json();
      if (res.ok) {
        setMessage(json.data.message);
        setActionMsg(`Status changed to ${status}`);
        setTimeout(() => setActionMsg(""), 3000);
      }
    } catch {
      setError("Failed to update status.");
    }
  };

  const handleStar = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/admin/messages/${messageId}/status`,
        {
          method:  "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization:  `Bearer ${token}`,
          },
          body: JSON.stringify({ isStarred: !message.isStarred }),
        }
      );
      const json = await res.json();
      if (res.ok) setMessage(json.data.message);
    } catch {
      setError("Failed to update message.");
    }
  };

  const handleReply = async (e) => {
    e.preventDefault();
    if (!replyBody.trim() || replyBody.trim().length < 5) return;
    setSending(true);
    try {
      const res = await fetch(
        `http://localhost:5000/api/admin/messages/${messageId}/reply`,
        {
          method:  "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:  `Bearer ${token}`,
          },
          body: JSON.stringify({ replyBody }),
        }
      );
      const json = await res.json();
      if (res.ok) {
        setMessage(json.data.message);
        setReplyDone(true);
        setReplyBody("");
        setActionMsg("Reply sent successfully!");
        setTimeout(() => setActionMsg(""), 4000);
      } else {
        setError(json.message);
      }
    } catch {
      setError("Failed to send reply.");
    } finally {
      setSending(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Permanently delete this message?")) return;
    try {
      const res = await fetch(
        `http://localhost:5000/api/admin/messages/${messageId}`,
        {
          method:  "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.ok) onNavigate("messages");
    } catch {
      setError("Failed to delete message.");
    }
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      weekday: "long", year: "numeric",
      month:   "long", day: "numeric",
      hour: "2-digit", minute: "2-digit",
    });

  if (loading) return (
    <div className="admin-loading">
      <div className="admin-loading-spinner" />
      <p>Loading message...</p>
    </div>
  );

  if (error) return (
    <div className="admin-error">⚠️ {error}</div>
  );

  if (!message) return null;

  return (
    <div className="message-detail">
      {/* Back */}
      <button
        className="detail-back-btn"
        onClick={() => onNavigate("messages")}
      >
        ← Back to Messages
      </button>

      {/* Action feedback */}
      {actionMsg && (
        <div className="detail-action-msg">✓ {actionMsg}</div>
      )}

      {/* Header */}
      <div className="detail-header">
        <div className="detail-header-left">
          <div className="detail-avatar">
            {message.name.charAt(0).toUpperCase()}
          </div>
          <div className="detail-sender-info">
            <div className="detail-name-row">
              <h2 className="detail-name">{message.name}</h2>
              <button
                className={`detail-star-btn ${message.isStarred ? "starred" : ""}`}
                onClick={handleStar}
                title={message.isStarred ? "Unstar" : "Star"}
              >
                {message.isStarred ? "⭐" : "☆"}
              </button>
            </div>
            <span className="detail-email">{message.email}</span>
            <span className="detail-date">{formatDate(message.createdAt)}</span>
          </div>
        </div>

        <div className="detail-actions">
          <select
            className="detail-status-select"
            value={message.status}
            onChange={(e) => handleStatusChange(e.target.value)}
          >
            <option value="unread">Unread</option>
            <option value="read">Read</option>
            <option value="replied">Replied</option>
            <option value="archived">Archived</option>
          </select>
          <button className="detail-delete-btn" onClick={handleDelete}>
            🗑 Delete
          </button>
        </div>
      </div>

      {/* Subject */}
      <div className="detail-subject-bar">
        <span className={`detail-status-badge status-${message.status}`}>
          {message.status}
        </span>
        <h3 className="detail-subject">{message.subject}</h3>
      </div>

      {/* Message Body */}
      <div className="detail-body">
        <div className="detail-body-label">Message</div>
        <p className="detail-message-text">{message.message}</p>
      </div>

      {/* Meta info */}
      <div className="detail-meta">
        {message.ipAddress && (
          <span className="detail-meta-item">📍 IP: {message.ipAddress}</span>
        )}
        <span className="detail-meta-item">
          🕒 Received: {formatDate(message.createdAt)}
        </span>
        {message.reply?.sentAt && (
          <span className="detail-meta-item">
            ✅ Replied: {formatDate(message.reply.sentAt)}
          </span>
        )}
      </div>

      {/* Previous Reply */}
      {message.reply?.body && (
        <div className="detail-prev-reply">
          <div className="detail-prev-reply-label">
            ✅ Your Previous Reply — {formatDate(message.reply.sentAt)}
          </div>
          <p className="detail-prev-reply-text">{message.reply.body}</p>
        </div>
      )}

      {/* Reply Form */}
      <div className="detail-reply-section">
        <h3 className="detail-reply-title">
          {message.reply?.body ? "Send Another Reply" : "Reply to this Message"}
        </h3>
        <p className="detail-reply-desc">
          Your reply will be sent directly to{" "}
          <strong style={{ color: "var(--accent)" }}>{message.email}</strong>
        </p>

        {replyDone && !replyBody && (
          <div className="detail-reply-success">
            ✓ Reply sent successfully to {message.email}
          </div>
        )}

        <form className="detail-reply-form" onSubmit={handleReply}>
          <div className="detail-reply-header-bar">
            <span>To: {message.name} &lt;{message.email}&gt;</span>
            <span>Subject: Re: {message.subject}</span>
          </div>
          <textarea
            className="detail-reply-textarea"
            placeholder={`Write your reply to ${message.name}...`}
            value={replyBody}
            onChange={(e) => setReplyBody(e.target.value)}
            rows={7}
          />
          <div className="detail-reply-footer">
            <span className="detail-char-count">
              {replyBody.length} characters
            </span>
            <button
              type="submit"
              className="detail-send-btn"
              disabled={sending || replyBody.trim().length < 5}
            >
              {sending ? (
                <>
                  <span className="admin-spinner" />
                  Sending...
                </>
              ) : (
                <>
                  Send Reply
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <line x1="22" y1="2" x2="11" y2="13"/>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                  </svg>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminMessageDetail;