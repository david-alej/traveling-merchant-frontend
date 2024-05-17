import FormatValue from "./FormatValue"
import { isEditable } from "../../util/data-utils"

import PropTypes from "prop-types"
import Input from "./input/Input"
import { useLocation } from "react-router-dom"

export default function Row({ index, property, header, value }) {
  const route = useLocation().pathname.split("/")[1]
  const action = useLocation().pathname.split("/").at(-1) || "view"

  return (
    <div key={index} className="row">
      <div className="header">
        <div className="header-text">{header}</div>
      </div>
      <div className="value">
        {property === "id" ? (
          value
        ) : (
          <FormatValue property={property} value={value} />
        )}
      </div>
      {action === "edit" && isEditable(route, property) && (
        <Input property={property} value={value} header={header} />
      )}
    </div>
  )
}

Row.propTypes = {
  index: PropTypes.number.isRequired,
  property: PropTypes.string.isRequired,
  value: PropTypes.any,
  header: PropTypes.string.isRequired,
}
