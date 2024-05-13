import PropTypes from "prop-types"
import { useState } from "react"

export default function FloatInput({ value, floatType }) {
  let condition = true

  const [float, setFloat] = useState()
  const [error, setError] = useState()

  const handleChange = ({ target }) => {
    const { value } = target
    let newError

    if (Number(value) !== value && value % 1 === 0) {
      newError = "a number"
    } else if (floatType === "positive" && value <= 0) {
      newError = "not positive"
    } else if (floatType === "nonNegative" && value < 0) {
      newError = "negative"
    }

    setError(newError)
    setFloat(value)
  }

  return (
    <>
      <input
        className="float"
        placeholder={value}
        value={float}
        onChange={handleChange}
      ></input>
      {error && <span>{`${" "} field must be ${error}`}</span>}
    </>
  )
}

FloatInput.propTypes = {
  value: PropTypes.number.isRequired,
  floatType: PropTypes.string,
}
