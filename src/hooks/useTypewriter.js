import { useState, useEffect, useRef } from "react";

const useTypewriter = (words = [], options = {}) => {
  const {
    typeSpeed    = 80,
    deleteSpeed  = 45,
    pauseTime    = 2000,
    loop         = true,
  } = options;

  const [displayText, setDisplayText]   = useState("");
  const [wordIndex, setWordIndex]       = useState(0);
  const [isDeleting, setIsDeleting]     = useState(false);
  const [isWaiting, setIsWaiting]       = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!words.length) return;

    const currentWord = words[wordIndex];

    const tick = () => {
      if (isWaiting) return;

      if (!isDeleting) {
        // Typing forward
        setDisplayText(currentWord.slice(0, displayText.length + 1));

        if (displayText.length + 1 === currentWord.length) {
          // Finished typing — pause before deleting
          setIsWaiting(true);
          timeoutRef.current = setTimeout(() => {
            setIsWaiting(false);
            setIsDeleting(true);
          }, pauseTime);
          return;
        }
      } else {
        // Deleting
        setDisplayText(currentWord.slice(0, displayText.length - 1));

        if (displayText.length - 1 === 0) {
          setIsDeleting(false);
          if (loop || wordIndex < words.length - 1) {
            setWordIndex((prev) => (prev + 1) % words.length);
          }
          return;
        }
      }
    };

    timeoutRef.current = setTimeout(tick, isDeleting ? deleteSpeed : typeSpeed);

    return () => clearTimeout(timeoutRef.current);
  }, [displayText, isDeleting, isWaiting, wordIndex, words, typeSpeed, deleteSpeed, pauseTime, loop]);

  return {
    displayText,
    isDeleting,
    currentWordIndex: wordIndex,
  };
};

export default useTypewriter;