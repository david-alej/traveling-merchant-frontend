import {
  changeError,
  changeValue,
  selectBodyProperty,
  selectErrorProperty,
} from "../bodySlice"

import PropTypes from "prop-types"
import { useDispatch, useSelector } from "react-redux"

export default function IdInput({ property }) {
  const dispatch = useDispatch()
  const integer = useSelector(selectBodyProperty(property))
  const error = useSelector(selectErrorProperty(property))

  const handleChange = ({ target }) => {
    let { value: newValue } = target
    newValue = newValue.replace(/[^0-9.-]/g, "")
    let newError

    if (newValue !== 0 && !newValue) {
      newError = ""
    } else if (isNaN(newValue)) {
      newError = "a number"
    } else if (newValue <= 0) {
      newError = "positive"
    } else if (Number.isInteger(newValue)) {
      newError = "an integer"
    }

    dispatch(changeError({ property, error: newError }))
    dispatch(changeValue({ property, value: newValue }))
  }

  return (
    <>
      <input
        placeholder="Positive Integer"
        value={integer || ""}
        onChange={handleChange}
      />
      {error && (
        <span className="float-error">{`Id field must be ${error}.`}</span>
      )}
    </>
  )
}

IdInput.propTypes = {
  property: PropTypes.string.isRequired,
}
