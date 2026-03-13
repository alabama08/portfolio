import { useState, useEffect } from "react";
import "./AdminDashboard.css";

const StatCard = ({ icon, label, value, color, sub }) => (
  <div className="stat-card" style={{ "--stat-color": color }}>
    <div className="stat-card-top">
      <span className="stat-icon">{icon}</span>
      <span className="stat-label">{label}</span>
    </div>
    <div className="stat-value">{value ?? "—"}</div>
    {sub && <div className="stat-sub">{sub}</div>}
    <div className="stat-card-line" />
  </div>
);

const AdminDashboard = ({ token, onNavigate }) => {
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res  = await fetch("https://portfolio-api-6qgo.onrender.com/api/admin/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const json = await res.json();
        if (res.ok) setData(json.data);
        else setError(json.message);
      } catch {
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [token]);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short", day: "numeric", hour: "2-digit", minute: "2-digit",
    });

  if (loading) return (
    <div className="admin-loading">
      <div className="admin-loading-spinner" />
      <p>Loading dashboard...</p>
    </div>
  );

  if (error) return (
    <div className="admin-error">
      <span>⚠️</span> {error}
    </div>
  );

  const { stats, recent } = data;

  return (
    <div className="admin-dashboard">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Dashboard</h1>
          <p className="admin-page-sub">
            Overview of your portfolio contact messages
          </p>
        </div>
        <button
          className="admin-refresh-btn"
          onClick={() => window.location.reload()}
        >
          ↻ Refresh
        </button>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <StatCard icon="📨" label="Total Messages"  value={stats.total}     color="#00e5ff" sub="All time" />
        <StatCard icon="🔴" label="Unread"           value={stats.unread}    color="#ff3cac" sub="Need attention" />
        <StatCard icon="✅" label="Replied"           value={stats.replied}   color="#00e676" sub="Completed" />
        <StatCard icon="📅" label="This Week"        value={stats.thisWeek}  color="#7b2fff" sub="Last 7 days" />
        <StatCard icon="📆" label="This Month"       value={stats.thisMonth} color="#00e5ff" sub="Last 30 days" />
        <StatCard icon="⭐" label="Starred"          value={stats.starred}   color="#fbbf24" sub="Important" />
        <StatCard icon="🗄️" label="Archived"         value={stats.archived}  color="#6b7fa3" sub="Stored away" />
        <StatCard icon="📊" label="Response Rate"
          value={stats.total ? `${Math.round((stats.replied / stats.total) * 100)}%` : "0%"}
          color="#ff3cac" sub="Replies / Total"
        />
      </div>

      {/* Recent Messages */}
      <div className="admin-recent">
        <div className="admin-recent-header">
          <h2 className="admin-recent-title">Recent Messages</h2>
          <button
            className="admin-view-all"
            onClick={() => onNavigate("messages")}
          >
            View all →
          </button>
        </div>

        <div className="admin-recent-list">
          {recent.length === 0 ? (
            <div className="admin-empty">
              <span>📭</span>
              <p>No messages yet</p>
            </div>
          ) : (
            recent.map((msg) => (
              <div
                key={msg._id}
                className={`recent-item ${msg.status === "unread" ? "recent-item-unread" : ""}`}
                onClick={() => onNavigate("message-detail", msg._id)}
              >
                <div className="recent-item-left">
                  <div className="recent-avatar">
                    {msg.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="recent-info">
                    <div className="recent-name-row">
                      <span className="recent-name">{msg.name}</span>
                      {msg.isStarred && <span className="recent-star">⭐</span>}
                      <span className={`recent-status-badge status-${msg.status}`}>
                        {msg.status}
                      </span>
                    </div>
                    <span className="recent-subject">{msg.subject}</span>
                    <span className="recent-email">{msg.email}</span>
                  </div>
                </div>
                <span className="recent-date">{formatDate(msg.createdAt)}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;