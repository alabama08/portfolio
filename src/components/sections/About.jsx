import useReveal from "../../hooks/useReveal";
import SectionHeader from "../common/SectionHeader";
import Button from "../common/Button";
import { SITE_META } from "../../utils/constants";
import "./About.css";

const facts = [
  { label: "Location",     value: "Lagos, Nigeria" },
  { label: "Availability", value: "Open to Work" },
  { label: "Focus",        value: "MERN Stack, Full Stack Web Developer" },
];

const About = () => {
  useReveal();

  return (
    <section id="about" className="about">
      <SectionHeader
        label="// about me"
        title="Who I Am"
        highlight="I Am"
        className="reveal"
      />

      <div className="about-grid">
        {/* Image Column */}
        <div className="about-img-col reveal-left">
          <div className="about-img-frame">
            <img
              src="/images/Alabama.jpeg"
              alt="Owoseni Motunrayo"
              className="about-img"
            />
            {/* Corner accents */}
            <div className="img-corner img-corner-tl" />
            <div className="img-corner img-corner-br" />
          </div>

          {/* Experience badge */}
          <div className="about-exp-badge">
            <span className="about-exp-num">3+</span>
            <span className="about-exp-text">Years of<br />Experience</span>
          </div>
        </div>

        {/* Text Column */}
        <div className="about-text-col reveal-right">
          <p>
            Hey! I'm Owoseni Motunrayo, a passionate full-stack
            developer who loves turning complex problems into elegant, scalable
            solutions. I thrive at the intersection of great design and solid
            engineering.
          </p>
          <p>
            With expertise spanning React, Node.js, databases, and cloud
            infrastructure, I've built everything from real-time chat
            applications to e-commerce platforms handling thousands of daily
            users. I care deeply about performance, accessibility, and clean
            code that's a joy to maintain.
          </p>
          <p>
            When I'm not building, you'll find me contributing to open source,
            writing technical articles, or exploring new technologies. I believe
            great software is built by curious minds who never stop learning.
          </p>

          {/* Facts Grid */}
          <div className="about-facts">
            {facts.map(({ label, value }) => (
              <div className="about-fact" key={label}>
                <span className="fact-label">{label}</span>
                <span className="fact-value">{value}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="about-cta">
            <Button
              variant="primary"
              href={SITE_META.resumeUrl}
              target="_blank"
            >
              Download CV
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                document
                  .getElementById("contact")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              Get In Touch
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;