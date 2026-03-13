import { useState, useEffect } from "react";
import { NAV_LINKS } from "./utils/constants.js";
import useTheme         from "./hooks/useTheme.js";
import useActiveSection from "./hooks/useActiveSection.js";

// Layout
import Layout from "./components/layout/Layout";

// Sections
import Hero         from "./components/sections/Hero";
import About        from "./components/sections/About";
import Skills       from "./components/sections/Skills";
import Projects     from "./components/sections/Projects";
import Experience   from "./components/sections/Experience";
import Services     from "./components/sections/Services";
import Testimonials from "./components/sections/Testimonials";
import Contact      from "./components/sections/Contact";

// Admin
import AdminPanel from "./pages/admin/AdminPanel";

// Common
import Loader from "./components/common/Loader";
import Cursor from "./components/common/Cursor";

// Styles
import "./styles/globals.css";
import "./styles/animations.css";
import "./styles/themes.css";

const sectionIds = NAV_LINKS.map((link) => link.id);

const App = () => {
  const [loading,  setLoading]  = useState(true);
  const [isAdmin,  setIsAdmin]  = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const activeSection           = useActiveSection(sectionIds);

  // Check if user is on /admin route
  useEffect(() => {
    const path = window.location.pathname;
    if (path === "/admin") setIsAdmin(true);
  }, []);

  // Listen for URL changes
  useEffect(() => {
    const handlePopState = () => {
      setIsAdmin(window.location.pathname === "/admin");
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Prevent scroll during loading
  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [loading]);

  // Render Admin Panel
  if (isAdmin) {
    return (
      <>
        <Cursor />
        <AdminPanel />
      </>
    );
  }

  // Loading screen
  if (loading) {
    return <Loader onComplete={() => setLoading(false)} />;
  }

  // Portfolio
  return (
    <>
      <Cursor />
      <Layout
        activeSection={activeSection}
        isDark={isDark}
        onToggleTheme={toggleTheme}
      >
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Services />
        <Testimonials />
        <Contact />
      </Layout>
    </>
  );
};

export default App;