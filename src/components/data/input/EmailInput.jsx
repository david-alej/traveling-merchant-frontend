import PropTypes from "prop-types"
import { useState } from "react"

export default function EmailInput({ value }) {
  const [email, setEmail] = useState()

  const handleChange = ({ target }) => {
    const { value } = target

    setEmail(value)
  }

  return (
    <input
      className="email"
      placeholder={value}
      value={email}
      onChange={handleChange}
    ></input>
  )
}

EmailInput.propTypes = { value: PropTypes.any }
