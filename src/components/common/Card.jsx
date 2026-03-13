import "./Card.css";

const Card = ({
  children,
  className  = "",
  hover      = true,
  glow       = false,
  padding    = "md",
  onClick,
  style,
}) => {
  const classes = [
    "card-base",
    hover   ? "card-hover"   : "",
    glow    ? "card-glow"    : "",
    `card-pad-${padding}`,
    onClick ? "card-clickable" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={classes}
      onClick={onClick}
      style={style}
    >
      {children}
    </div>
  );
};

export default Card;