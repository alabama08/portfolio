import { useState, useEffect, useRef, useCallback } from "react";
import useReveal from "../../hooks/useReveal";
import SectionHeader from "../common/SectionHeader";
import { testimonials } from "../../data/testimonials.js";
import "./Testimonials.css";

const StarRating = ({ rating }) => (
  <div className="star-rating">
    {Array.from({ length: 5 }).map((_, i) => (
      <span
        key={i}
        className={`star ${i < rating ? "star-filled" : "star-empty"}`}
      >
        ★
      </span>
    ))}
  </div>
);

const Testimonials = () => {
  useReveal();
  const [current,   setCurrent]   = useState(0);
  const [paused,    setPaused]    = useState(false);
  const [animating, setAnimating] = useState(false);
  const intervalRef = useRef(null);

  const goTo = useCallback(
    (index) => {
      if (animating) return;
      setAnimating(true);
      setCurrent(index);
      setTimeout(() => setAnimating(false), 500);
    },
    [animating]
  );

  const goNext = useCallback(() => {
    goTo((current + 1) % testimonials.length);
  }, [current, goTo]);

  const goPrev = useCallback(() => {
    goTo((current - 1 + testimonials.length) % testimonials.length);
  }, [current, goTo]);

  // Auto-advance every 5 seconds
  useEffect(() => {
    if (paused) return;
    intervalRef.current = setInterval(goNext, 5000);
    return () => clearInterval(intervalRef.current);
  }, [paused, goNext]);

  const active = testimonials[current];

  return (
    <section id="testimonials" className="testimonials">
      <SectionHeader
        label="// client feedback"
        title="What Clients Say"
        highlight="Clients"
        subtitle="Don't just take my word for it — here is what the people I have worked with have to say."
        className="reveal"
      />

      <div
        className="testimonials-wrapper reveal"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Main Card */}
        <div className={`testimonial-card ${animating ? "testimonial-animating" : ""}`}>
          {/* Quote mark */}
          <div className="testimonial-quote-mark">"</div>

          {/* Stars */}
          <StarRating rating={active.rating} />

          {/* Text */}
          <blockquote className="testimonial-text">
            {active.text}
          </blockquote>

          {/* Author */}
          <div className="testimonial-author">
            <div
              className="testimonial-avatar"
              style={{ background: active.avatarColor }}
            >
              {active.avatar}
            </div>
            <div className="testimonial-author-info">
              <span className="testimonial-name">{active.name}</span>
              <span className="testimonial-role">
                {active.role} · {active.company}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="testimonial-nav">
          {/* Prev */}
          <button
            className="testimonial-arrow testimonial-arrow-prev"
            onClick={goPrev}
            aria-label="Previous testimonial"
          >
            <svg
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Dots */}
          <div className="testimonial-dots">
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`testimonial-dot ${i === current ? "testimonial-dot-active" : ""}`}
                onClick={() => goTo(i)}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          {/* Next */}
          <button
            className="testimonial-arrow testimonial-arrow-next"
            onClick={goNext}
            aria-label="Next testimonial"
          >
            <svg
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* Progress bar */}
        <div className="testimonial-progress">
          <div
            className={`testimonial-progress-fill ${!paused ? "testimonial-progress-animate" : ""}`}
            key={current}
          />
        </div>

        {/* All avatars strip */}
        <div className="testimonial-strip">
          {testimonials.map((t, i) => (
            <button
              key={t.id}
              className={`testimonial-strip-item ${i === current ? "strip-item-active" : ""}`}
              onClick={() => goTo(i)}
              aria-label={`View testimonial from ${t.name}`}
            >
              <div
                className="strip-avatar"
                style={{ background: t.avatarColor }}
              >
                {t.avatar}
              </div>
              <span className="strip-name">{t.name.split(" ")[0]}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;