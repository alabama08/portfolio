// ─── Site Meta ────────────────────────────────────
export const SITE_META = {
  name: "Your Name",
  title: "Your Name | Full-Stack Developer",
  description:
    "Full-stack developer specializing in React, Node.js, and scalable web applications. Available for freelance and full-time opportunities.",
  email: "owosenimotunrayo2@gmail.com",
  phone: "+234 000 000 0000",
  location: "Lagos, Nigeria",
  availability: "Open to work",
  resumeUrl: "/resume.pdf",
};

// ─── Navigation Links ─────────────────────────────
export const NAV_LINKS = [
  { id: "hero",        label: "Home" },
  { id: "about",       label: "About" },
  { id: "skills",      label: "Skills" },
  { id: "projects",    label: "Projects" },
  { id: "experience",  label: "Experience" },
  { id: "services",    label: "Services" },
  { id: "testimonials",label: "Testimonials" },
  { id: "contact",     label: "Contact" },
];

// ─── Social Links ─────────────────────────────────
export const SOCIAL_LINKS = {
  github:   "https://github.com/alabama08",
  linkedin: "https://www.linkedin.com/in/owoseni/",
  twitter:  "https://twitter.com/yourusername",
  email:    "mailto:owosenimotunrayo2@gmail.com",
};

// ─── Hero Typewriter Roles ────────────────────────
export const TYPEWRITER_ROLES = [
  "Full-Stack Developer",
  "React Specialist",
  "Node.js Engineer",
  "UI/UX Enthusiast",
  "Open Source Contributor",
  "Problem Solver",
];

// ─── Hero Stats ───────────────────────────────────
export const HERO_STATS = [
  { number: "3+",  label: "Years Experience" },
  { number: "40+", label: "Projects Completed" },
  { number: "15+", label: "Happy Clients" },
  { number: "99%", label: "Client Satisfaction" },
];

// ─── Filter Categories ────────────────────────────
export const PROJECT_FILTERS = [
  { id: "all",        label: "All" },
  { id: "fullstack",  label: "Full-Stack" },
  { id: "frontend",   label: "Frontend" },
  { id: "backend",    label: "Backend" },
];

// ─── API Base URL ─────────────────────────────────
export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";