import PropTypes from "prop-types"

export default function Row({ index, value, header, input = <></> }) {
  return (
    <div key={index} className="row">
      <div className="header">
        <div className="header-text">{header}</div>
      </div>
      <div className="value">{value}</div>
      {input}
    </div>
  )
}

Row.propTypes = {
  index: PropTypes.number.isRequired,
  value: PropTypes.any.isRequired,
  header: PropTypes.string.isRequired,
  input: PropTypes.object,
}
