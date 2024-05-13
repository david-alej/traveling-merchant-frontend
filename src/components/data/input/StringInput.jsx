import PropTypes from "prop-types"
import { useState } from "react"

export default function StringInput({ value }) {
  const [string, setString] = useState("")

  const handleChange = ({ target }) => {
    const { value } = target

    setString(value)
  }

  return (
    <input
      className="string"
      placeholder={value}
      value={string}
      onChange={handleChange}
    ></input>
  )
}

StringInput.propTypes = {
  value: PropTypes.number.isRequired,
}
