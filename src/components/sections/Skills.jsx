import { useEffect } from "react";
import useReveal from "../../hooks/useReveal";
import SectionHeader from "../common/SectionHeader";
import { skillCategories } from "../../data/skills.js";
import "./Skills.css";

const Skills = () => {
  useReveal();

  // Animate skill bars when section enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target
              .querySelectorAll(".skill-bar-fill")
              .forEach((bar) => {
                const width = bar.getAttribute("data-width");
                bar.style.width = width + "%";
              });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    const section = document.getElementById("skills");
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="skills">
      <SectionHeader
        label="// skills & tools"
        title="What I Know"
        highlight="Know"
        className="reveal"
      />

      <div className="skills-grid reveal">
        {skillCategories.map((cat) => (
          <div
            className="skill-card"
            key={cat.id}
            style={{ "--card-accent": cat.color }}
          >
            {/* Card top accent line */}
            <div className="skill-card-line" />

            <div className="skill-card-header">
              <span className="skill-card-icon">{cat.icon}</span>
              <h3 className="skill-card-title">{cat.title}</h3>
            </div>

            {/* Pills */}
            {!cat.type && (
              <div className="skill-pills">
                {cat.skills.map((skill) => (
                  <span className="skill-pill" key={skill}>
                    {skill}
                  </span>
                ))}
              </div>
            )}

            {/* Bars */}
            {cat.type === "bars" && (
              <div className="skill-bars">
                {cat.skills.map(({ label, pct }) => (
                  <div className="skill-bar-item" key={label}>
                    <div className="skill-bar-header">
                      <span className="skill-bar-label">{label}</span>
                      <span className="skill-bar-pct">{pct}%</span>
                    </div>
                    <div className="skill-bar-bg">
                      <div
                        className="skill-bar-fill"
                        data-width={pct}
                        style={{ width: 0 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;