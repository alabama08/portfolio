import "./Button.css";

const Button = ({
  children,
  variant      = "primary",
  size         = "md",
  href,
  target,
  onClick,
  type         = "button",
  disabled     = false,
  className    = "",
  icon,
  iconPosition = "right",
  fullWidth    = false,
}) => {

  const classes = [
    "btn",
    `btn-${variant}`,
    `btn-${size}`,
    fullWidth ? "btn-full"     : "",
    disabled  ? "btn-disabled" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {icon && iconPosition === "left" && (
        <span className="btn-icon">{icon}</span>
      )}
      <span className="btn-label">{children}</span>
      {icon && iconPosition === "right" && (
        <span className="btn-icon">{icon}</span>
      )}
    </>
  );

  if (href) {
    return (
      <a href={href} target={target} rel={target === "_blank" ? "noreferrer" : undefined} className={classes} onClick={onClick}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled}>
      {content}
    </button>
  );

};

export default Button;