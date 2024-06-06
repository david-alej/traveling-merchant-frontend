import PropTypes from "prop-types"

export default function Row({ value, header, input = <></> }) {
  return (
    <div className="row">
      <div className="header">
        <div className="header-text">{header}</div>
      </div>
      <div className="value">{value}</div>
      {input}
    </div>
  )
}

Row.propTypes = {
  value: PropTypes.any,
  header: PropTypes.string.isRequired,
  input: PropTypes.object,
}
