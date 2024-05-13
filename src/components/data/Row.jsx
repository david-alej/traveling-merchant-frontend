import FormatValue from "./Formatvalue"

import PropTypes from "prop-types"
import Input from "./input/Input"

export default function Row({
  index,
  property,
  header,
  value,
  body,
  onChangeBody,
}) {
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
      {body && onChangeBody && (
        <Input
          property={property}
          value={value}
          header={header}
          body={body}
          onChangeBody={onChangeBody}
        />
      )}
    </div>
  )
}

Row.propTypes = {
  index: PropTypes.number.isRequired,
  property: PropTypes.string.isRequired,
  value: PropTypes.any,
  header: PropTypes.string.isRequired,
  body: PropTypes.object,
  onChangeBody: PropTypes.func,
}
