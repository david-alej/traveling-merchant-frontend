import {
  camelToFlat,
  findIndentyInformation,
  orderProperties,
} from "../../util/data-utils.jsx"
import FormatValue from "./FormatValue.jsx"

import PropTypes from "prop-types"
import { useState } from "react"
import { FaAngleDown } from "react-icons/fa"
import { Link } from "react-router-dom"

export default function MiniData({ index, value, header }) {
  const [isOpen, setIsOpen] = useState(false)
  const { nameValue } = findIndentyInformation(value)

  return (
    <div key={index} className="extended-row">
      <div className="header">
        <div className="arrow" onClick={() => setIsOpen(!isOpen)}>
          <FaAngleDown size={20} />
        </div>
        <div className="header-text">{header}</div>
        <div className="name-value">{nameValue}</div>
      </div>
      <div className={"value" + (isOpen ? " open" : "")}>
        {orderProperties(value).map((property, index) => (
          <div className={"sub-row" + (index ? " not-first" : "")} key={index}>
            {property === "id" ? (
              <>
                <div className="sub-header">Id</div>
                <div className="sub-value">
                  <Link to={`/${header.toLowerCase()}s/${value[property]}`}>
                    {value[property]}
                  </Link>
                </div>
              </>
            ) : (
              <>
                <div className="sub-header">{camelToFlat(property)}</div>
                <div className="sub-value">
                  <FormatValue property={property} value={value[property]} />
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

MiniData.propTypes = {
  index: PropTypes.number.isRequired,
  property: PropTypes.string.isRequired,
  value: PropTypes.object.isRequired,
  header: PropTypes.string.isRequired,
}
