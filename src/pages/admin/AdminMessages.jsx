import { useState, useEffect, useCallback } from "react";
import "./AdminMessages.css";

const AdminMessages = ({ token, onNavigate }) => {
  const [messages,   setMessages]   = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState("");
  const [filter,     setFilter]     = useState("all");
  const [search,     setSearch]     = useState("");
  const [searchInput,setSearchInput]= useState("");
  const [page,       setPage]       = useState(1);
  const [selected,   setSelected]   = useState([]);

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page, limit: 10,
        status: filter,
        search,
      });
      const res  = await fetch(
        `http://localhost:5000/api/admin/messages?${params}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const json = await res.json();
      if (res.ok) {
        setMessages(json.data.messages);
        setPagination(json.data.pagination);
      } else {
        setError(json.message);
      }
    } catch {
      setError("Failed to load messages.");
    } finally {
      setLoading(false);
    }
  }, [token, page, filter, search]);

  useEffect(() => { fetchMessages(); }, [fetchMessages]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchInput);
    setPage(1);
  };

  const handleBulkAction = async (action) => {
    if (!selected.length) return;
    if (action === "delete" && !window.confirm(`Delete ${selected.length} message(s)?`)) return;

    try {
      const res = await fetch("http://localhost:5000/api/admin/messages/bulk", {
        method:  "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:  `Bearer ${token}`,
        },
        body: JSON.stringify({ action, messageIds: selected }),
      });
      if (res.ok) {
        setSelected([]);
        fetchMessages();
      }
    } catch {
      setError("Bulk action failed.");
    }
  };

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selected.length === messages.length) {
      setSelected([]);
    } else {
      setSelected(messages.map((m) => m._id));
    }
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short", day: "numeric", year: "numeric",
    });

  const filters = [
    { id: "all",      label: "All",      icon: "📨" },
    { id: "unread",   label: "Unread",   icon: "🔴" },
    { id: "read",     label: "Read",     icon: "👁️" },
    { id: "replied",  label: "Replied",  icon: "✅" },
    { id: "archived", label: "Archived", icon: "🗄️" },
  ];

  return (
    <div className="admin-messages">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Messages</h1>
          <p className="admin-page-sub">
            {pagination.total ?? 0} total messages
          </p>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="messages-toolbar">
        <form className="messages-search" onSubmit={handleSearch}>
          <input
            type="text"
            className="messages-search-input"
            placeholder="Search by name, email, subject..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button type="submit" className="messages-search-btn">
            🔍
          </button>
          {search && (
            <button
              type="button"
              className="messages-clear-btn"
              onClick={() => { setSearch(""); setSearchInput(""); setPage(1); }}
            >
              ✕
            </button>
          )}
        </form>

        <div className="messages-filters">
          {filters.map(({ id, label, icon }) => (
            <button
              key={id}
              className={`msg-filter-btn ${filter === id ? "msg-filter-active" : ""}`}
              onClick={() => { setFilter(id); setPage(1); }}
            >
              {icon} {label}
            </button>
          ))}
        </div>
      </div>

      {/* Bulk Actions */}
      {selected.length > 0 && (
        <div className="bulk-actions">
          <span className="bulk-count">{selected.length} selected</span>
          <button onClick={() => handleBulkAction("markRead")}    className="bulk-btn">Mark Read</button>
          <button onClick={() => handleBulkAction("markUnread")}  className="bulk-btn">Mark Unread</button>
          <button onClick={() => handleBulkAction("archive")}     className="bulk-btn">Archive</button>
          <button onClick={() => handleBulkAction("delete")}      className="bulk-btn bulk-btn-danger">Delete</button>
          <button onClick={() => setSelected([])}                 className="bulk-btn">Cancel</button>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="admin-error" style={{ marginBottom: 16 }}>
          ⚠️ {error}
        </div>
      )}

      {/* Messages Table */}
      {loading ? (
        <div className="admin-loading">
          <div className="admin-loading-spinner" />
          <p>Loading messages...</p>
        </div>
      ) : messages.length === 0 ? (
        <div className="admin-empty-state">
          <span>📭</span>
          <h3>No messages found</h3>
          <p>
            {search
              ? `No results for "${search}"`
              : "No messages in this category yet"}
          </p>
        </div>
      ) : (
        <div className="messages-table-wrap">
          <table className="messages-table">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={selected.length === messages.length && messages.length > 0}
                    onChange={toggleSelectAll}
                    className="msg-checkbox"
                  />
                </th>
                <th>Sender</th>
                <th>Subject</th>
                <th>Status</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg) => (
                <tr
                  key={msg._id}
                  className={`msg-row ${msg.status === "unread" ? "msg-row-unread" : ""}`}
                >
                  <td>
                    <input
                      type="checkbox"
                      checked={selected.includes(msg._id)}
                      onChange={() => toggleSelect(msg._id)}
                      className="msg-checkbox"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </td>
                  <td>
                    <div className="msg-sender">
                      <div className="msg-avatar">
                        {msg.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="msg-sender-info">
                        <span className="msg-name">
                          {msg.name}
                          {msg.isStarred && " ⭐"}
                        </span>
                        <span className="msg-email">{msg.email}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="msg-subject">{msg.subject}</span>
                  </td>
                  <td>
                    <span className={`msg-status-badge status-${msg.status}`}>
                      {msg.status}
                    </span>
                  </td>
                  <td>
                    <span className="msg-date">{formatDate(msg.createdAt)}</span>
                  </td>
                  <td>
                    <button
                      className="msg-view-btn"
                      onClick={() => onNavigate("message-detail", msg._id)}
                    >
                      View →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="messages-pagination">
          <button
            className="page-btn"
            onClick={() => setPage((p) => p - 1)}
            disabled={!pagination.hasPrev}
          >
            ← Prev
          </button>
          <span className="page-info">
            Page {pagination.page} of {pagination.totalPages}
          </span>
          <button
            className="page-btn"
            onClick={() => setPage((p) => p + 1)}
            disabled={!pagination.hasNext}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminMessages;