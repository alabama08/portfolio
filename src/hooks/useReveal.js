import { useEffect } from "react";

const useReveal = (options = {}) => {
  const {
    threshold  = 0.12,
    rootMargin = "0px 0px -60px 0px",
    selector   = ".reveal, .reveal-left, .reveal-right",
  } = options;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            // Unobserve after animation fires for performance
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );

    // Observe all reveal elements
    const elements = document.querySelectorAll(selector);
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [threshold, rootMargin, selector]);
};

export default useReveal;