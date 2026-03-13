import { useState } from "react";
import useReveal from "../../hooks/useReveal";
import SectionHeader from "../common/SectionHeader";
import Badge from "../common/Badge";
import { projects } from "../../data/projects";
import { PROJECT_FILTERS } from "../../utils/constants";
import "./Projects.css";

const Projects = () => {
  useReveal();
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="projects">
      <SectionHeader
        label="// featured projects"
        title="What I've Built"
        highlight="Built"
        className="reveal"
      />

      {/* Filter Tabs */}
      <div className="projects-filters reveal">
        {PROJECT_FILTERS.map(({ id, label }) => (
          <button
            key={id}
            className={`filter-btn ${
              activeFilter === id ? "filter-btn-active" : ""
            }`}
            onClick={() => setActiveFilter(id)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="projects-grid reveal">
        {filtered.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
};

const ProjectCard = ({ project }) => {
  return (
    <div
      className="project-card"
      style={{ "--project-color": project.color }}
    >
      {/* Preview */}
      <div className="project-preview">
        <span className="project-emoji">{project.emoji}</span>
        {project.featured && (
          <Badge
            variant="accent2"
            size="sm"
            className="project-featured-badge"
          >
            Featured
          </Badge>
        )}
        <div className="project-preview-overlay" />
      </div>

      {/* Body */}
      <div className="project-body">

        {/* Tags */}
        <div className="project-tags">
          {project.tags.slice(0, 3).map((tag) => (
            <span className="project-tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="project-title">{project.title}</h3>

        {/* Description */}
        <p className="project-desc">{project.description}</p>

        {/* Links */}
        <div className="project-links">

          <div
            className="project-link project-link-code"
            onClick={() => window.open(project.codeUrl, "_blank")}
            role="button"
            tabIndex={0}
            onKeyDown={(e) =>
              e.key === "Enter" && window.open(project.codeUrl, "_blank")
            }
          >
            <svg
              width="14"
              height="14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
            Source Code
          </div>

          <div
            className="project-link project-link-demo"
            onClick={() => window.open(project.demoUrl, "_blank")}
            role="button"
            tabIndex={0}
            onKeyDown={(e) =>
              e.key === "Enter" && window.open(project.demoUrl, "_blank")
            }
          >
            <svg
              width="14"
              height="14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            Live Demo
          </div>

        </div>
      </div>

      {/* Bottom accent line */}
      <div className="project-card-accent" />
    </div>
  );
};

export default Projects;