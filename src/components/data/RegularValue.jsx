import FormatValue from "./Formatvalue"

import PropTypes from "prop-types"

export default function RegularValue({ index, property, header, value }) {
  return (
    <div key={index} className="row">
      <div className="header">
        <div className="header-text">{header}</div>
      </div>
      <div className="value">
        {property === "id" ? value : FormatValue(property, value)}
      </div>
    </div>
  )
}

RegularValue.propTypes = {
  index: PropTypes.number.isRequired,
  property: PropTypes.string.isRequired,
  value: PropTypes.any,
  header: PropTypes.string.isRequired,
}
