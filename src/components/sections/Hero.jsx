import { useEffect } from "react";
import useTypewriter from "../../hooks/useTypewriter";
import Button from "../common/Button";
import Badge from "../common/Badge";
import {
  SITE_META,
  TYPEWRITER_ROLES,
  HERO_STATS,
} from "../../utils/constants";
import "./Hero.css";

const Hero = () => {
  const { displayText, isDeleting } = useTypewriter(TYPEWRITER_ROLES, {
    typeSpeed:   75,
    deleteSpeed: 40,
    pauseTime:   2200,
  });

  return (
    <section id="hero" className="hero">
      {/* Background effects */}
      <div className="hero-bg-glow" />
      <div className="hero-grid-overlay" />

      <div className="hero-content">
        {/* Availability badge */}
        <div className="hero-badge-wrap animate-fadeUp">
          <Badge variant="accent" dot dotColor="#00e676">
            {SITE_META.availability}
          </Badge>
        </div>

        {/* Name */}
        <h1 className="hero-name">
          <span
            className="hero-name-line1"
            style={{ animationDelay: "0.1s" }}
          >
            Hi, I'm
          </span>
          <span
            className="hero-name-line2 accent"
            style={{ animationDelay: "0.2s" }}
          >
            {SITE_META.name}
          </span>
        </h1>

        {/* Typewriter role */}
        <div
          className="hero-role"
          style={{ animationDelay: "0.35s" }}
        >
          <span className="hero-role-text">{displayText}</span>
          <span
            className={`hero-cursor ${isDeleting ? "cursor-deleting" : ""}`}
          >
            _
          </span>
        </div>

        {/* Description */}
        <p
          className="hero-desc animate-fadeUp"
          style={{ animationDelay: "0.5s" }}
        >
          {SITE_META.description}
        </p>

        {/* CTA Buttons */}
        <div
          className="hero-actions animate-fadeUp"
          style={{ animationDelay: "0.65s" }}
        >
          <Button
            variant="primary"
            size="lg"
            onClick={() =>
              document
                .getElementById("projects")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            View My Work
          </Button>
          <Button
            variant="outline"
            size="lg"
            href={SITE_META.resumeUrl}
            target="_blank"
          >
            Download CV
          </Button>
        </div>

        {/* Scroll indicator */}
        <div className="hero-scroll-indicator">
          <div className="scroll-line" />
          <span>Scroll to explore</span>
        </div>
      </div>

      {/* Stats */}
      <div className="hero-stats">
        {HERO_STATS.map(({ number, label }, i) => (
          <div
            key={label}
            className="hero-stat-card"
            style={{ animationDelay: `${0.8 + i * 0.1}s` }}
          >
            <span className="hero-stat-number">{number}</span>
            <span className="hero-stat-label">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hero;