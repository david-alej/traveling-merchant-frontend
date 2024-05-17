import PropTypes from "prop-types"

export default function Button({
  key,
  className,
  text,
  icon,
  onClick,
  disabled,
  type,
}) {
  return (
    <button
      key={key}
      className={className}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {text && <p className="button-text">{text}</p>}
      {icon && <div className="button-icon">{icon}</div>}
    </button>
  )
}

Button.propTypes = {
  key: PropTypes.number,
  className: PropTypes.string.isRequired,
  text: PropTypes.string,
  icon: PropTypes.any,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  type: PropTypes.string,
}
