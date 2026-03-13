import { useState } from "react";
import "./AdminLogin.css";

const AdminLogin = ({ onLogin }) => {
  const [password, setPassword] = useState("");
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password.trim()) {
      setError("Password is required.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const res  = await fetch("https://portfolio-api-6qgo.onrender.com/api/admin/login", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ password }),
      });
      const data = await res.json();

      if (res.ok && data.status === "success") {
        localStorage.setItem("adminToken",   data.token);
        localStorage.setItem("adminLoginTime", Date.now());
        onLogin(data.token);
      } else {
        setError(data.message || "Incorrect password.");
      }
    } catch {
      setError("Network error. Make sure the server is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      {/* Background */}
      <div className="admin-login-bg" />
      <div className="admin-login-grid" />

      <div className="admin-login-card">
        {/* Logo */}
        <div className="admin-login-logo">
          dev<span>.</span>admin
        </div>
        <p className="admin-login-subtitle">
          Portfolio Admin Panel
        </p>

        {/* Lock Icon */}
        <div className="admin-login-icon">
          🔐
        </div>

        <h1 className="admin-login-title">Secure Access</h1>
        <p className="admin-login-desc">
          Enter your admin password to access the dashboard
        </p>

        {/* Form */}
        <form className="admin-login-form" onSubmit={handleSubmit}>
          <div className="admin-login-input-wrap">
            <input
              type={showPass ? "text" : "password"}
              className={`admin-login-input ${error ? "input-error" : ""}`}
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              autoFocus
              autoComplete="current-password"
            />
            <button
              type="button"
              className="admin-login-eye"
              onClick={() => setShowPass(!showPass)}
              tabIndex={-1}
            >
              {showPass ? "🙈" : "👁️"}
            </button>
          </div>

          {error && (
            <div className="admin-login-error">
              <span>✕</span> {error}
            </div>
          )}

          <button
            type="submit"
            className="admin-login-btn"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="admin-spinner" />
                Authenticating...
              </>
            ) : (
              <>
                Access Dashboard
                <span>→</span>
              </>
            )}
          </button>
        </form>

        <p className="admin-login-footer">
          Portfolio by <span>Your Name</span> · Admin v1.0
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;