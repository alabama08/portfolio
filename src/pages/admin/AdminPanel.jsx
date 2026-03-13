import { useState, useEffect } from "react";
import AdminLogin         from "./AdminLogin";
import AdminDashboard     from "./AdminDashboard";
import AdminMessages      from "./AdminMessages";
import AdminMessageDetail from "./AdminMessageDetail";
import "./AdminPanel.css";

const AdminPanel = () => {
  const [token,        setToken]        = useState(null);
  const [currentView,  setCurrentView]  = useState("dashboard");
  const [selectedMsgId,setSelectedMsgId]= useState(null);
  const [unreadCount,  setUnreadCount]  = useState(0);

  // Check for existing token on mount
  useEffect(() => {
    const savedToken = localStorage.getItem("adminToken");
    const loginTime  = localStorage.getItem("adminLoginTime");
    if (savedToken && loginTime) {
      const elapsed = Date.now() - parseInt(loginTime);
      const sevenDays = 7 * 24 * 60 * 60 * 1000;
      if (elapsed < sevenDays) {
        setToken(savedToken);
      } else {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminLoginTime");
      }
    }
  }, []);

  // Fetch unread count for sidebar badge
  useEffect(() => {
    if (!token) return;
    const fetchUnread = async () => {
      try {
        const res  = await fetch("http://localhost:5000/api/admin/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const json = await res.json();
        if (res.ok) setUnreadCount(json.data.stats.unread);
      } catch {}
    };
    fetchUnread();
    const interval = setInterval(fetchUnread, 30000); // poll every 30s
    return () => clearInterval(interval);
  }, [token, currentView]);

  const handleLogin = (newToken) => {
    setToken(newToken);
    setCurrentView("dashboard");
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminLoginTime");
    setToken(null);
    setCurrentView("dashboard");
  };

  const handleNavigate = (view, id = null) => {
    setCurrentView(view);
    if (id) setSelectedMsgId(id);
  };

  if (!token) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  const navItems = [
    { id: "dashboard", icon: "📊", label: "Dashboard" },
    { id: "messages",  icon: "📨", label: "Messages", badge: unreadCount },
  ];

  return (
    <div className="admin-panel">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-top">
          <div className="admin-sidebar-logo">
            dev<span>.</span>admin
          </div>
          <p className="admin-sidebar-desc">Portfolio Admin</p>
        </div>

        <nav className="admin-nav">
          {navItems.map(({ id, icon, label, badge }) => (
            <button
              key={id}
              className={`admin-nav-item ${currentView === id || (currentView === "message-detail" && id === "messages") ? "admin-nav-active" : ""}`}
              onClick={() => handleNavigate(id)}
            >
              <span className="admin-nav-icon">{icon}</span>
              <span className="admin-nav-label">{label}</span>
              {badge > 0 && (
                <span className="admin-nav-badge">{badge}</span>
              )}
            </button>
          ))}
        </nav>

        <div className="admin-sidebar-bottom">
          <button
            className="admin-portfolio-btn"
            onClick={() => window.open("/", "_blank")}
          >
            🌐 View Portfolio
          </button>
          <button className="admin-logout-btn" onClick={handleLogout}>
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <div className="admin-topbar">
          <div className="admin-topbar-left">
            <h2 className="admin-topbar-title">
              {currentView === "dashboard"      && "Dashboard"}
              {currentView === "messages"       && "Messages"}
              {currentView === "message-detail" && "Message Detail"}
            </h2>
          </div>
          <div className="admin-topbar-right">
            {unreadCount > 0 && (
              <div className="admin-topbar-badge">
                🔴 {unreadCount} unread
              </div>
            )}
            <div className="admin-topbar-user">
              <span className="admin-user-avatar">👤</span>
              <span className="admin-user-label">Admin</span>
            </div>
          </div>
        </div>

        <div className="admin-content">
          {currentView === "dashboard" && (
            <AdminDashboard token={token} onNavigate={handleNavigate} />
          )}
          {currentView === "messages" && (
            <AdminMessages token={token} onNavigate={handleNavigate} />
          )}
          {currentView === "message-detail" && selectedMsgId && (
            <AdminMessageDetail
              token={token}
              messageId={selectedMsgId}
              onNavigate={handleNavigate}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;