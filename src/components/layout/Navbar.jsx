import { useState, useEffect } from "react";
import { NAV_LINKS } from "../../utils/constants";
import { scrollToSection } from "../../utils/helpers";
import ThemeToggle from "../common/ThemeToggle";
import "./Navbar.css";

const Navbar = ({ activeSection, isDark, onToggleTheme }) => {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleNavClick = (id) => {
    scrollToSection(id);
    setMenuOpen(false);
  };

  return (
    <>
      {/* ─── Main Navbar ─────────────────────── */}
      <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>

        {/* Logo */}
        <div
          className="navbar-logo"
          onClick={() => handleNavClick("hero")}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && handleNavClick("hero")}
        >
          dev<span>.</span>folio
        </div>

        {/* Desktop Navigation Links */}
        <ul className="navbar-links">
          {NAV_LINKS.map(({ id, label }) => (
            <li key={id}>
              <button
                className={`navbar-link ${
                  activeSection === id ? "navbar-link-active" : ""
                }`}
                onClick={() => handleNavClick(id)}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        {/* Right Actions */}
        <div className="navbar-actions">
          <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />

          <button
            className="navbar-cta"
            onClick={() => handleNavClick("contact")}
          >
            Hire Me
          </button>

          {/* Hamburger Button */}
          <button
            className={`navbar-hamburger ${menuOpen ? "hamburger-open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* ─── Mobile Menu Overlay ──────────────── */}
      <div className={`mobile-menu ${menuOpen ? "mobile-menu-open" : ""}`}>
        <div className="mobile-menu-inner">

          {/* Close button */}
          <button
            className="mobile-menu-close"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            ✕
          </button>

          {/* Nav Links */}
          {NAV_LINKS.map(({ id, label }, index) => (
            <button
              key={id}
              className={`mobile-menu-link ${
                activeSection === id ? "mobile-link-active" : ""
              }`}
              onClick={() => handleNavClick(id)}
              style={{ animationDelay: `${index * 0.06}s` }}
            >
              <span className="mobile-link-num">
                0{index + 1}.
              </span>
              {label}
            </button>
          ))}

          {/* CTA */}
          <button
            className="mobile-menu-cta"
            onClick={() => handleNavClick("contact")}
          >
            Hire Me
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;