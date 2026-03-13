import "./SectionHeader.css";

const SectionHeader = ({
  label,
  title,
  highlight,
  subtitle,
  align     = "left",
  className = "",
}) => {
  const renderTitle = () => {
    if (!highlight) return title;

    const parts = title.split(highlight);
    return (
      <>
        {parts[0]}
        <em>{highlight}</em>
        {parts[1]}
      </>
    );
  };

  return (
    <div className={`section-header section-header-${align} ${className}`}>
      {label && (
        <span className="section-label">{label}</span>
      )}
      <h2 className="section-title">
        {renderTitle()}
      </h2>
      <div className="section-divider" />
      {subtitle && (
        <p className="section-subtitle">{subtitle}</p>
      )}
    </div>
  );
};

export default SectionHeader;