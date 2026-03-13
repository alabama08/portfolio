import { useState, useEffect } from "react";

const useActiveSection = (sectionIds = [], offset = 120) => {
  const [activeSection, setActiveSection] = useState(sectionIds[0] || "");

  useEffect(() => {
    if (!sectionIds.length) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset;

      // Find which section we are currently in
      let current = sectionIds[0];

      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (!element) continue;

        const { offsetTop } = element;
        if (scrollPosition >= offsetTop) {
          current = id;
        }
      }

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Run once on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionIds, offset]);

  return activeSection;
};

export default useActiveSection;