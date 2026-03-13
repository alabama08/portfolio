import useReveal from "../../hooks/useReveal";
import SectionHeader from "../common/SectionHeader";
import { services } from "../../data/services.js";
import "./Services.css";

const Services = () => {
  useReveal();

  return (
    <section id="services" className="services">
      <SectionHeader
        label="// what i offer"
        title="My Services"
        highlight="Services"
        subtitle="From concept to deployment — here is how I can help bring your ideas to life."
        className="reveal"
      />

      {/* Services Grid */}
      <div className="services-grid reveal">
        {services.map((service, index) => (
          <div
            className={`service-card ${service.popular ? "service-card-popular" : ""}`}
            key={service.id}
            style={{ "--service-color": service.color }}
          >
            {/* Popular Badge */}
            {service.popular && (
              <div className="service-popular-badge">
                ⭐ Most Popular
              </div>
            )}

            {/* Top accent line */}
            <div className="service-card-line" />

            {/* Icon */}
            <div className="service-icon-wrap">
              <span className="service-icon">{service.icon}</span>
              <div className="service-icon-glow" />
            </div>

            {/* Content */}
            <h3 className="service-title">{service.title}</h3>
            <p className="service-desc">{service.description}</p>

            {/* Features */}
            <ul className="service-features">
              {service.features.map((feature, i) => (
                <li key={i} className="service-feature-item">
                  <span className="service-feature-check">✓</span>
                  {feature}
                </li>
              ))}
            </ul>

            {/* Footer */}
            <div className="service-footer">
              <div className="service-pricing">
                <span className="service-price-label">Starting from</span>
                <span className="service-price">{service.startingPrice}</span>
              </div>
              <div className="service-delivery">
                <span className="service-delivery-icon">⏱</span>
                <span className="service-delivery-text">
                  {service.deliveryTime}
                </span>
              </div>
            </div>

            {/* CTA */}
            <div
              className="service-cta"
              onClick={() =>
                document
                  .getElementById("contact")
                  .scrollIntoView({ behavior: "smooth" })
              }
              role="button"
              tabIndex={0}
              onKeyDown={(e) =>
                e.key === "Enter" &&
                document
                  .getElementById("contact")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              Get Started
              <svg
                width="14"
                height="14"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom note */}
      <div className="services-note reveal">
        <p>
          Need something custom?{" "}
          <span
            className="services-note-link"
            onClick={() =>
              document
                .getElementById("contact")
                .scrollIntoView({ behavior: "smooth" })
            }
            role="button"
            tabIndex={0}
            onKeyDown={(e) =>
              e.key === "Enter" &&
              document
                .getElementById("contact")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            Let's talk about your project →
          </span>
        </p>
      </div>
    </section>
  );
};

export default Services;