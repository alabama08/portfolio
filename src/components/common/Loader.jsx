import { useEffect, useState } from "react";
import "./Loader.css";

const Loader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut]   = useState(false);

  useEffect(() => {
    // Animate progress bar
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    // Start fade out at 2s
    const fadeTimer = setTimeout(() => setFadeOut(true), 2000);

    // Unmount at 2.4s
    const doneTimer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 2400);

    return () => {
      clearInterval(interval);
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  return (
    <div className={`loader-screen ${fadeOut ? "fade-out" : ""}`}>
      <div className="loader-content">
        {/* Logo */}
        <div className="loader-logo">
          dev<span>.</span>folio
        </div>

        {/* Progress bar */}
        <div className="loader-bar-wrap">
          <div
            className="loader-bar-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Status text */}
        <p className="loader-status">
          {progress < 40
            ? "Initializing..."
            : progress < 80
            ? "Loading assets..."
            : "Almost ready..."}
        </p>

        {/* Percentage */}
        <span className="loader-pct">{progress}%</span>
      </div>
    </div>
  );
};

export default Loader;