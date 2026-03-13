import "./Badge.css";

const Badge = ({
  children,
  variant   = "default",
  size      = "md",
  dot       = false,
  dotColor,
  className = "",
}) => {
  const classes = [
    "badge",
    `badge-${variant}`,
    `badge-${size}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={classes}>
      {dot && (
        <span
          className="badge-dot"
          style={dotColor ? { background: dotColor } : undefined}
        />
      )}
      {children}
    </span>
  );
};

export default Badge;