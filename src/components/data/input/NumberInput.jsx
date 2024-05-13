import PropTypes from "prop-types"
import { useState } from "react"

export default function NumberInput({ value }) {
  const [number, setNumber] = useState()

  const handleChange = ({ target }) => {
    const { value } = target

    setNumber(value)
  }

  return (
    <input
      className="number"
      placeholder={value}
      value={number}
      onChange={handleChange}
    ></input>
  )
}

NumberInput.propTypes = {
  value: PropTypes.number.isRequired,
}
