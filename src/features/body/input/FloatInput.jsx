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
    const { value } = target
    let newError

    if (value !== 0 && !value) {
      newError = ""
    } else if (isNaN(value)) {
      newError = "a number"
    } else if (floatType === "nonNegative" && value < 0) {
      newError = "positive or zero"
    } else if (floatType === "positive" && value <= 0) {
      newError = "positive"
    } else if (value?.split(".")[1]?.length > 2) {
      newError = "a numver with only two decimal points"
    }

    dispatch(changeError({ property, value: newError }))
    dispatch(changeValue({ property, value }))
  }

  return (
    <>
      <input
        className="float"
        placeholder={value}
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
  value: PropTypes.number.isRequired,
  floatType: PropTypes.string,
}
