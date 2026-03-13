import { useState, useEffect } from "react";

const useTheme = () => {
  const getInitialTheme = () => {
    // Check localStorage first
    const saved = localStorage.getItem("portfolio-theme");
    if (saved) return saved;
    // Fall back to system preference
    if (window.matchMedia("(prefers-color-scheme: light)").matches) {
      return "light";
    }
    return "dark";
  };

  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    // Apply theme to <html> tag
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const isDark  = theme === "dark";
  const isLight = theme === "light";

  return { theme, toggleTheme, isDark, isLight };
};

export default useTheme;