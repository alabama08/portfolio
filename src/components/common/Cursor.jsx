import { useEffect, useRef } from "react";
import "./Cursor.css";

const Cursor = () => {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const mouse   = useRef({ x: 0, y: 0 });
  const ring    = useRef({ x: 0, y: 0 });
  const rafRef  = useRef(null);

  useEffect(() => {
    // Hide default cursor
    document.body.style.cursor = "none";

    const onMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };

      // Dot follows instantly
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 6}px, ${e.clientY - 6}px)`;
      }
    };

    // Hover effects on interactive elements
    const onMouseEnter = () => {
      dotRef.current?.classList.add("cursor-hover");
      ringRef.current?.classList.add("cursor-hover");
    };

    const onMouseLeave = () => {
      dotRef.current?.classList.remove("cursor-hover");
      ringRef.current?.classList.remove("cursor-hover");
    };

    const addHoverListeners = () => {
      const interactives = document.querySelectorAll(
        "a, button, [role='button'], input, textarea, .cursor-pointer"
      );
      interactives.forEach((el) => {
        el.addEventListener("mouseenter", onMouseEnter);
        el.addEventListener("mouseleave", onMouseLeave);
      });
    };

    // Ring follows with lag (lerp)
    const animate = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.1;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.1;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x - 18}px, ${ring.current.y - 18}px)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove);
    rafRef.current = requestAnimationFrame(animate);

    // Add hover listeners after a short delay so DOM is ready
    setTimeout(addHoverListeners, 500);

    return () => {
      document.body.style.cursor = "auto";
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div className="cursor-dot"  ref={dotRef}  />
      <div className="cursor-ring" ref={ringRef} />
    </>
  );
};

export default Cursor;