import { getMiniDataColumns, getNameValue } from "../../util/body-utils.jsx"
import {
  addRequirement,
  removeRequirement,
  selectBodyProperty,
  changeValue,
} from "./bodySlice.js"
import ObjectInput from "./input/ObjectInput.jsx"
import Arrow from "../../components/Arrow.jsx"

import PropTypes from "prop-types"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Button from "../../components/Button.jsx"

function DataValue({ value, foreign, columns }) {
  let createSubValues =
    typeof value === "object" && foreign
      ? (property, cell) => (
          <>
            <div className="sub-value">
              {cell({ getValue: () => value[property] })}
            </div>
            <div className="sub-value">
              {cell({ getValue: () => foreign[property] })}
            </div>
          </>
        )
      : !foreign
      ? (property, cell) => (
          <>
            <div className="sub-value">
              {cell({ getValue: () => value[property] })}
            </div>
          </>
        )
      : (property, cell) => (
          <>
            <div className="sub-value"> </div>
            <div className="sub-value">
              {cell({ getValue: () => foreign[property] })}
            </div>
          </>
        )

  return (
    <div className="data-value">
      {columns.map(({ accessorKey: property, header, cell }, index) => (
        <div className={"sub-row" + (index ? " not-first" : "")} key={index}>
          <div className="sub-header">{header}</div>
          {createSubValues(property, cell)}
        </div>
      ))}
    </div>
  )
}

DataValue.propTypes = {
  value: PropTypes.any,
  foreign: PropTypes.object,
  header: PropTypes.string.isRequired,
  columns: PropTypes.array,
}

export default function MiniData({
  property,
  value,
  header,
  isActive,
  setActivity,
}) {
  const dispatch = useDispatch()
  const columns = getMiniDataColumns(property)
  const action = useLocation().pathname.split("/").at(-1)
  const nameValue = typeof value === "object" ? getNameValue(value) : "Required"
  const isProperAction = action === "edit" || action === "create"
  const hasActivity = setActivity

  const foreign = useSelector(selectBodyProperty(property))
  const [isOpen, setIsOpen] = useState(false)
  useEffect(() => {
    if (value === "Required") {
      if (!setActivity || (setActivity && isActive)) {
        dispatch(addRequirement(property))
      } else {
        dispatch(removeRequirement(property))
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [property, value, isActive])

  useEffect(() => {
    if (hasActivity && !isActive && foreign && Object.keys(foreign).length) {
      dispatch(changeValue({ property, value: undefined }))
    }
  }, [property, hasActivity, isActive, foreign, dispatch])

  return (
    <div
      className={"mini-data" + (hasActivity && !isActive ? " not-active" : "")}
    >
      <div className="header">
        <Arrow state={isOpen} onClick={() => setIsOpen(!isOpen)} />
        <div className="header-text">{header}</div>
        <div className="name-value">
          <div className="object-name-value">{nameValue}</div>
          {hasActivity &&
            (isActive ? (
              <Button
                type="button"
                className="object-activity-button on"
                onClick={setActivity}
                text="On"
              />
            ) : (
              <Button
                type="button"
                className="object-activity-button"
                onClick={setActivity}
                text="Disabled"
              />
            ))}
        </div>
        {isProperAction && (!hasActivity || isActive) && (
          <div className="input">
            <ObjectInput property={property} value={value} header={header} />
          </div>
        )}
      </div>
      {isOpen && (typeof value === "object" || foreign) && (
        <div className="value">
          <DataValue
            value={value}
            foreign={foreign}
            header={header}
            columns={columns}
          />
        </div>
      )}
    </div>
  )
}

MiniData.propTypes = {
  property: PropTypes.string.isRequired,
  value: PropTypes.any,
  header: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  setActivity: PropTypes.func,
}
