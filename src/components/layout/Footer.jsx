import { NAV_LINKS, SOCIAL_LINKS, SITE_META } from "../../utils/constants";
import { scrollToSection } from "../../utils/helpers";
import "./Footer.css";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-top">

        {/* Brand */}
        <div className="footer-brand">
          <div className="footer-logo">
            dev<span>.</span>folio
          </div>
          <p className="footer-tagline">
            Building digital experiences that are fast, accessible, and built to last.
          </p>
          <div className="footer-socials">

            {/* GitHub */}
            <div
              className="footer-social"
              role="button"
              tabIndex={0}
              aria-label="GitHub"
              onClick={() => window.open(SOCIAL_LINKS.github, "_blank")}
              onKeyDown={(e) => e.key === "Enter" && window.open(SOCIAL_LINKS.github, "_blank")}
            >
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
            </div>

            {/* LinkedIn */}
            <div
              className="footer-social"
              role="button"
              tabIndex={0}
              aria-label="LinkedIn"
              onClick={() => window.open(SOCIAL_LINKS.linkedin, "_blank")}
              onKeyDown={(e) => e.key === "Enter" && window.open(SOCIAL_LINKS.linkedin, "_blank")}
            >
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </div>

            {/* Twitter / X */}
            <div
              className="footer-social"
              role="button"
              tabIndex={0}
              aria-label="Twitter"
              onClick={() => window.open(SOCIAL_LINKS.twitter, "_blank")}
              onKeyDown={(e) => e.key === "Enter" && window.open(SOCIAL_LINKS.twitter, "_blank")}
            >
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </div>

            {/* Email */}
            <div
              className="footer-social"
              role="button"
              tabIndex={0}
              aria-label="Email"
              onClick={() => window.open(`mailto:${SITE_META.email}`, "_self")}
              onKeyDown={(e) => e.key === "Enter" && window.open(`mailto:${SITE_META.email}`, "_self")}
            >
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </div>

          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <h4 className="footer-col-title">Navigation</h4>
          <ul className="footer-nav">
            {NAV_LINKS.map(({ id, label }) => (
              <li key={id}>
                <button
                  className="footer-nav-link"
                  onClick={() => scrollToSection(id)}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-col">
          <h4 className="footer-col-title">Contact</h4>
          <ul className="footer-contact-list">
            <li>
              <span className="footer-contact-label">Email</span>
              <div
                className="footer-contact-value footer-contact-link"
                role="button"
                tabIndex={0}
                onClick={() => window.open(`mailto:${SITE_META.email}`, "_self")}
                onKeyDown={(e) =>
                  e.key === "Enter" &&
                  window.open(`mailto:${SITE_META.email}`, "_self")
                }
              >
                {SITE_META.email}
              </div>
            </li>
            <li>
              <span className="footer-contact-label">Location</span>
              <span className="footer-contact-value">{SITE_META.location}</span>
            </li>
            <li>
              <span className="footer-contact-label">Status</span>
              <span className="footer-contact-value footer-status">
                <span className="footer-status-dot" />
                {SITE_META.availability}
              </span>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <p className="footer-copy">
          © {year} <span>{SITE_META.name}</span>. All rights reserved.
        </p>
        <p className="footer-built">
          Built with <span>React</span> + <span>Node.js</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;