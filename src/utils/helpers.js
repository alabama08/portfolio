// ─── Smooth Scroll to Section ─────────────────────
export const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const navHeight = 80;
    const top =
      element.getBoundingClientRect().top + window.pageYOffset - navHeight;
    window.scrollTo({ top, behavior: "smooth" });
  }
};

// ─── Format Date ──────────────────────────────────
export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year:  "numeric",
    month: "long",
    day:   "numeric",
  });
};

// ─── Truncate Text ────────────────────────────────
export const truncateText = (text, maxLength = 120) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "...";
};

// ─── Debounce ─────────────────────────────────────
export const debounce = (func, wait = 300) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// ─── Clamp Number ────────────────────────────────
export const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

// ─── Check if element is in viewport ─────────────
export const isInViewport = (element, offset = 0) => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) - offset
  );
};

// ─── Generate random ID ───────────────────────────
export const generateId = () =>
  Math.random().toString(36).substring(2, 9);

// ─── Copy text to clipboard ───────────────────────
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
};

// ─── Get initials from name ───────────────────────
export const getInitials = (name) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};