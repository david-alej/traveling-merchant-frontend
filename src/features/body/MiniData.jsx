import {
  camelToFlat,
  getNameValue,
  orderProperties,
} from "../../util/data-utils.jsx"
import { changeValue, selectBodyProperty } from "./bodySlice.js"
import FormatValue from "./FormatValue.jsx"
import ObjectInput from "./input/ObjectInput.jsx"
import Arrow from "../../components/Arrow.jsx"

import PropTypes from "prop-types"
import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Button from "../../components/Button.jsx"

function DataValue({ value, foreign, header }) {
  let modelProperties = orderProperties(value || foreign)
  if (!modelProperties.length) return <div className="data-value"></div>
  modelProperties.shift()

  const idSubRow = (
    <div className="sub-row" key={0}>
      <div className="sub-header">Id</div>
      <div className="sub-value">
        {value ? (
          <Link to={`/${header.toLowerCase()}s/${value.id}`}>{value.id}</Link>
        ) : (
          " "
        )}
      </div>
      <div className="sub-value">
        {foreign && (
          <Link to={`/${header.toLowerCase()}s/${foreign.id}`}>
            {foreign.id}
          </Link>
        )}
      </div>
    </div>
  )

  let createSubValues =
    value && foreign
      ? (property) => (
          <>
            <div className="sub-value">
              <FormatValue property={property} value={value[property]} />
            </div>
            <div className="sub-value">
              <FormatValue property={property} value={foreign[property]} />
            </div>
          </>
        )
      : !foreign
      ? (property) => (
          <>
            <div className="sub-value">
              <FormatValue property={property} value={value[property]} />
            </div>
          </>
        )
      : (property) => (
          <>
            <div className="sub-value"> </div>
            <div className="sub-value">
              <FormatValue property={property} value={foreign[property]} />
            </div>
          </>
        )

  return (
    <div className="data-value">
      {[idSubRow].concat(
        modelProperties.map((property, index) => (
          <div className="sub-row not-first" key={index + 1}>
            <div className="sub-header">{camelToFlat(property)}</div>
            {createSubValues(property)}
          </div>
        ))
      )}
    </div>
  )
}

DataValue.propTypes = {
  value: PropTypes.object,
  foreign: PropTypes.object,
  header: PropTypes.string.isRequired,
}

export default function MiniData({ value, header, isActive, setActivity }) {
  const dispatch = useDispatch()
  const foreign = useSelector(selectBodyProperty(header.toLowerCase()))
  const [isOpen, setIsOpen] = useState(false)
  const action = useLocation().pathname.split("/").at(-1)
  const nameValue = value && getNameValue(value)
  const isProperAction = action === "edit" || action === "create"
  const hasActivity = setActivity

  if (hasActivity && !isActive) {
    if (isOpen) setIsOpen(false)

    if (foreign && Object.keys(foreign).length) {
      dispatch(
        changeValue({ property: header.toLowerCase(), value: undefined })
      )
    }
  }

  return (
    <div
      className={"mini-data" + (hasActivity && !isActive ? " not-active" : "")}
    >
      <div className="header">
        <Arrow onClick={() => setIsOpen(!isOpen)} />
        <div className="header-text">{header}</div>
        <div className="name-value">
          {setActivity ? (
            isActive ? (
              <Button
                type="button"
                className="object-active"
                onClick={setActivity}
                text="Required"
              />
            ) : (
              <Button
                type="button"
                className="object-not-active"
                onClick={setActivity}
                text="Off"
              />
            )
          ) : (
            nameValue || "Required"
          )}
        </div>
        {isProperAction && (!hasActivity || isActive) && (
          <div className="input">
            <ObjectInput value={value} header={header} />
          </div>
        )}
      </div>
      {isOpen && (
        <div className="value">
          <DataValue value={value} foreign={foreign} header={header} />
        </div>
      )}
    </div>
  )
}

MiniData.propTypes = {
  value: PropTypes.object,
  header: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  setActivity: PropTypes.func,
}
