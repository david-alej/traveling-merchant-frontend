import {
  camelToFlat,
  getNameValue,
  orderProperties,
} from "../../util/data-utils.jsx"
import { selectBodyProperty } from "./bodySlice.js"
import FormatValue from "./FormatValue.jsx"
import ForeignInput from "./input/ForeignInput"

import PropTypes from "prop-types"
import { FaAngleDown } from "react-icons/fa"
import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { useSelector } from "react-redux"

function DataValue({ value, foreign, header }) {
  let modelProperties = orderProperties(value || foreign)
  const idSubRow = modelProperties.shift().map((id) => (
    <div className="sub-row" key={0}>
      <div className="sub-header">Id</div>
      <div className="sub-value">
        {value ? <Link to={`/${header.toLowerCase()}s/${id}`}>{id}</Link> : " "}
      </div>
      <div className="sub-value"></div>
    </div>
  ))

  modelProperties.map((property, index) => (
    <div className="sub-row not-first" key={index}>
      <div className="sub-header">{camelToFlat(property)}</div>
      <div className="sub-value">
        {value ? <Link to={`/${header.toLowerCase()}s/${id}`}>{id}</Link> : " "}
      </div>
      <div className="sub-value"></div>
    </div>
  ))

  modelProperties.unshift(idSubRow)

  let content

  if (value && !foreign) {
    content = modelProperties.map((property, index) => (
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
    ))
  } else if (!value && foreign) {
    content = modelProperties.map((property, index) => (
      <div className={"sub-row" + (index ? " not-first" : "")} key={index}>
        {property === "id" ? (
          <>
            <div className="sub-header">Id</div>
            <div className="sub-value"> </div>
            <div className="sub-value">
              <Link to={`/${header.toLowerCase()}s/${foreign[property]}`}>
                {foreign[property]}
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="sub-header">{camelToFlat(property)}</div>
            <div className="sub-value"> </div>
            <div className="sub-value">
              <FormatValue property={property} value={foreign[property]} />
            </div>
          </>
        )}
      </div>
    ))
  } else if (value && foreign) {
    content = modelProperties.map((property, index) => (
      <div className={"sub-row" + (index ? " not-first" : "")} key={index}>
        {property === "id" ? (
          <>
            <div className="sub-header">Id</div>
            <div className="sub-value">
              <Link to={`/${header.toLowerCase()}s/${value[property]}`}>
                {value[property]}
              </Link>
            </div>
            <div className="sub-value">
              <Link to={`/${header.toLowerCase()}s/${foreign[property]}`}>
                {foreign[property]}
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="sub-header">{camelToFlat(property)}</div>
            <div className="sub-value">
              <FormatValue property={property} value={value[property]} />
            </div>
            <div className="sub-value">
              <FormatValue property={property} value={foreign[property]} />
            </div>
          </>
        )}
      </div>
    ))
  }

  return (
    <div className="data-value">
      {content}
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
              {Object.keys(foreign).length !== 0 && (
                <div className="sub-value">
                  <Link to={`/${header.toLowerCase()}s/${foreign[property]}`}>
                    {foreign[property]}
                  </Link>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="sub-header">{camelToFlat(property)}</div>
              <div className="sub-value">
                <FormatValue property={property} value={value[property]} />
              </div>
              {Object.keys(foreign).length !== 0 && (
                <div className="sub-value">
                  <FormatValue property={property} value={foreign[property]} />
                </div>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  )
}

DataValue.propTypes = {
  value: PropTypes.object.isRequired,
  foreign: PropTypes.object,
  header: PropTypes.string.isRequired,
}

export default function MiniData({ index, value, header }) {
  const foreign = useSelector(selectBodyProperty(header.toLowerCase())) || {}
  const [isOpen, setIsOpen] = useState(false)
  const nameValue = getNameValue(value)
  const actionIsEdit = useLocation().pathname.split("/").at(-1) === "edit"

  return (
    <div key={index} className="mini-data">
      <div className="header">
        <div className="arrow" onClick={() => setIsOpen(!isOpen)}>
          <FaAngleDown size={20} />
        </div>
        <div className="header-text">{header}</div>
        <div className="name-value">{nameValue}</div>
        {actionIsEdit && (
          <div className="input">
            <ForeignInput value={value} header={header} />
          </div>
        )}
      </div>
      <div className={"value" + (isOpen ? " open" : "")}>
        <DataValue value={value} foreign={foreign} header={header} />
      </div>
    </div>
  )
}

MiniData.propTypes = {
  index: PropTypes.number.isRequired,
  value: PropTypes.object.isRequired,
  header: PropTypes.string.isRequired,
}
