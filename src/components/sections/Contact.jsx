import { useState } from "react";
import useReveal from "../../hooks/useReveal";
import SectionHeader from "../common/SectionHeader";
import { SITE_META, SOCIAL_LINKS } from "../../utils/constants.js";
import { API_BASE_URL } from "../../utils/constants.js";
import "./Contact.css";

const socialLinks = [
  {
    icon: (
      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
      </svg>
    ),
    label: "GitHub",
    value: "https://github.com/alabama08",
    href: SOCIAL_LINKS.github,
    color: "#e0eaf5",
  },
  {
    icon: (
      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    label: "LinkedIn",
    value: "https://www.linkedin.com/in/owoseni/",
    href: SOCIAL_LINKS.linkedin,
    color: "#0077b5",
  },
  {
    icon: (
      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    label: "Twitter / X",
    value: "@owoseni23",
    href: SOCIAL_LINKS.twitter,
    color: "#1da1f2",
  },
  {
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    label: "Email",
    value: SITE_META.email,
    href: `mailto:${SITE_META.email}`,
    color: "#00e5ff",
  },
];

const initialForm = {
  name:    "",
  email:   "",
  subject: "",
  message: "",
};

const Contact = () => {
  useReveal();
  const [form,    setForm]    = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [status,  setStatus]  = useState(null);
  const [errors,  setErrors]  = useState({});

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim() || form.name.trim().length < 2)
      newErrors.name = "Name must be at least 2 characters.";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Please enter a valid email address.";
    if (!form.subject.trim() || form.subject.trim().length < 3)
      newErrors.subject = "Subject must be at least 3 characters.";
    if (!form.message.trim() || form.message.trim().length < 10)
      newErrors.message = "Message must be at least 10 characters.";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch(`${API_BASE_URL}/api/contact`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok && data.status === "success") {
        setStatus({ type: "success", message: data.message });
        setForm(initialForm);
        setErrors({});
      } else {
        setStatus({
          type:    "error",
          message: data.message || "Something went wrong. Please try again.",
        });
      }
    } catch {
      setStatus({
        type:    "error",
        message: "Network error. Please check your connection and try again.",
      });
    } finally {
      setLoading(false);
      setTimeout(() => setStatus(null), 6000);
    }
  };

  return (
    <section id="contact" className="contact">
      <SectionHeader
        label="// get in touch"
        title="Let's Work Together"
        highlight="Work Together"
        subtitle="Have a project in mind or just want to say hello? My inbox is always open."
        className="reveal"
      />

      <div className="contact-grid">
        {/* ─── Left Column ──────────────────── */}
        <div className="contact-info reveal-left">
          <div className="contact-info-card">
            <h3 className="contact-info-title">
              Let's build something amazing together
            </h3>
            <p className="contact-info-text">
              I am currently available for freelance projects, full-time
              positions, and consulting work. Whether you have a project brief
              ready or just an idea — I would love to hear from you.
            </p>
            <p className="contact-info-text">
              Typical response time is within{" "}
              <strong style={{ color: "var(--accent)" }}>24 hours</strong>.
            </p>

            {/* Status */}
            <div className="contact-availability">
              <span className="availability-dot" />
              <span className="availability-text">
                Currently available for new projects
              </span>
            </div>

            {/* Social Links */}
            <div className="contact-links">
              {socialLinks.map(({ icon, label, value, href, color }) => (
                <div
                  key={label}
                  className="contact-link"
                  onClick={() => window.open(href, "_blank")}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) =>
                    e.key === "Enter" && window.open(href, "_blank")
                  }
                >
                  <div
                    className="contact-link-icon"
                    style={{ "--link-color": color }}
                  >
                    {icon}
                  </div>
                  <div className="contact-link-info">
                    <span className="contact-link-label">{label}</span>
                    <span className="contact-link-value">{value}</span>
                  </div>
                  <svg
                    className="contact-link-arrow"
                    width="14"
                    height="14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ─── Right Column — Form ──────────── */}
        <div className="contact-form-col reveal-right">
          <form
            className="contact-form"
            onSubmit={handleSubmit}
            noValidate
          >
            {/* Row: Name + Email */}
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="name">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className={`form-input ${errors.name ? "form-input-error" : ""}`}
                  placeholder="John Doe"
                  value={form.name}
                  onChange={handleChange}
                  autoComplete="name"
                />
                {errors.name && (
                  <span className="form-error">{errors.name}</span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="email">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className={`form-input ${errors.email ? "form-input-error" : ""}`}
                  placeholder="john@example.com"
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="email"
                />
                {errors.email && (
                  <span className="form-error">{errors.email}</span>
                )}
              </div>
            </div>

            {/* Subject */}
            <div className="form-group">
              <label className="form-label" htmlFor="subject">
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                className={`form-input ${errors.subject ? "form-input-error" : ""}`}
                placeholder="Project Inquiry / Freelance Work / Just saying hi"
                value={form.subject}
                onChange={handleChange}
              />
              {errors.subject && (
                <span className="form-error">{errors.subject}</span>
              )}
            </div>

            {/* Message */}
            <div className="form-group">
              <label className="form-label" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                className={`form-textarea ${errors.message ? "form-input-error" : ""}`}
                placeholder="Tell me about your project, timeline, and budget..."
                value={form.message}
                onChange={handleChange}
                rows={6}
              />
              {errors.message && (
                <span className="form-error">{errors.message}</span>
              )}
              <span className="form-char-count">
                {form.message.length} characters
              </span>
            </div>

            {/* Status Message */}
            {status && (
              <div className={`form-status form-status-${status.type}`}>
                <span className="form-status-icon">
                  {status.type === "success" ? "✓" : "✕"}
                </span>
                {status.message}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              className={`form-submit ${loading ? "form-submit-loading" : ""}`}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="submit-spinner" />
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <svg
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;