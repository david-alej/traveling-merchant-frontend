import { camelToFlat } from "../../../util/data-utils"
import {
  changeError,
  changeValue,
  selectBodyProperty,
  selectErrorProperty,
} from "../bodySlice"

import PropTypes from "prop-types"
import { useDispatch, useSelector } from "react-redux"

export default function FloatInput({ property, value, floatType }) {
  const dispatch = useDispatch()
  const float = useSelector(selectBodyProperty(property))
  const error = useSelector(selectErrorProperty(property))
  const header = camelToFlat(property)

  const handleChange = ({ target }) => {
    const { value: newValue } = target
    let newError

    if (newValue !== 0 && !newValue) {
      newError = ""
    } else if (isNaN(newValue)) {
      newError = "a number"
    } else if (newValue === value) {
      newError = "different than the current number"
    } else if (floatType === "nonNegative" && newValue < 0) {
      newError = "positive or zero"
    } else if (floatType === "positive" && newValue <= 0) {
      newError = "positive"
    } else if (newValue?.split(".")[1]?.length > 2) {
      newError = "a numver with only two decimal points"
    }

    dispatch(changeError({ property, value: newError }))
    dispatch(changeValue({ property, value: newValue }))
  }

  return (
    <>
      <input
        className="float"
        placeholder={value || `${camelToFlat(floatType)} Number`}
        value={float}
        onChange={handleChange}
      />
      {error && (
        <span className="error">{`${header} field must be ${error}.`}</span>
      )}
    </>
  )
}

FloatInput.propTypes = {
  property: PropTypes.string.isRequired,
  value: PropTypes.number,
  floatType: PropTypes.string,
}
