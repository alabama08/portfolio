import { useState } from "react";
import useReveal from "../../hooks/useReveal";
import SectionHeader from "../common/SectionHeader";
import { experiences } from "../../data/experience.js";
import "./Experience.css";

const Experience = () => {
  useReveal();
  const [activeTab, setActiveTab] = useState("all");

  const tabs = [
    { id: "all",       label: "All" },
    { id: "work",      label: "Work" },
    { id: "education", label: "Education" },
  ];

  const filtered =
    activeTab === "all"
      ? experiences
      : experiences.filter((e) => e.type === activeTab);

  return (
    <section id="experience" className="experience">
      <SectionHeader
        label="// my journey"
        title="Experience &"
        highlight="Experience"
        subtitle="My professional journey, the companies I have worked with, and the education that shaped my engineering mindset."
        className="reveal"
      />

      {/* Tabs */}
      <div className="exp-tabs reveal">
        {tabs.map(({ id, label }) => (
          <button
            key={id}
            className={`exp-tab ${activeTab === id ? "exp-tab-active" : ""}`}
            onClick={() => setActiveTab(id)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div className="timeline reveal">
        {/* Vertical line */}
        <div className="timeline-line" />

        {filtered.map((item, index) => (
          <div
            className={`timeline-item ${
              index % 2 === 0 ? "timeline-item-left" : "timeline-item-right"
            }`}
            key={item.id}
          >
            {/* Dot */}
            <div
              className="timeline-dot"
              style={{ "--dot-color": item.color }}
            >
              <span className="timeline-dot-icon">{item.icon}</span>
              <div className="timeline-dot-ring" />
            </div>

            {/* Card */}
            <div
              className="timeline-card"
              style={{ "--card-color": item.color }}
            >
              {/* Card top accent */}
              <div className="timeline-card-accent" />

              {/* Header */}
              <div className="timeline-card-header">
                <div className="timeline-card-header-left">
                  <span
                    className={`timeline-type-badge ${
                      item.type === "education"
                        ? "badge-education"
                        : "badge-work"
                    }`}
                  >
                    {item.type === "education" ? "🎓 Education" : "💼 Work"}
                  </span>
                  {item.current && (
                    <span className="timeline-current-badge">
                      <span className="current-dot" />
                      Current
                    </span>
                  )}
                </div>
                <span className="timeline-period">{item.period}</span>
              </div>

              {/* Role & Company */}
              <h3 className="timeline-role">{item.role}</h3>
              <div className="timeline-company-row">
                <span className="timeline-company">{item.company}</span>
                <span className="timeline-separator">·</span>
                <span className="timeline-company-type">
                  {item.companyType}
                </span>
                <span className="timeline-separator">·</span>
                <span className="timeline-location">📍 {item.location}</span>
              </div>

              {/* Description */}
              <p className="timeline-desc">{item.description}</p>

              {/* Achievements */}
              <div className="timeline-achievements">
                <span className="timeline-achievements-title">
                  Key Achievements
                </span>
                <ul className="timeline-achievements-list">
                  {item.achievements.map((achievement, i) => (
                    <li key={i} className="timeline-achievement-item">
                      <span className="achievement-arrow">→</span>
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Stack */}
              <div className="timeline-stack">
                {item.stack.map((tech) => (
                  <span className="timeline-stack-tag" key={tech}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="experience-cta reveal">
        <p>Want to know more about my experience?</p>
        <div
          className="exp-cta-btn"
          onClick={() =>
            window.open("/resume.pdf", "_blank")
          }
          role="button"
          tabIndex={0}
          onKeyDown={(e) =>
            e.key === "Enter" && window.open("/resume.pdf", "_blank")
          }
        >
          Download Full Resume
          <svg
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Experience;