import "./ThemeToggle.css";

const ThemeToggle = ({ isDark, onToggle }) => {
  return (
    <button
      className="theme-toggle-btn"
      onClick={onToggle}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <span className="theme-toggle-icon">
        {isDark ? "☀️" : "🌙"}
      </span>
    </button>
  );
};

export default ThemeToggle;