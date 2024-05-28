import { FaAngleRight } from "react-icons/fa"
import PropTypes from "prop-types"
import { useState } from "react"

export default function Arrow({ onClick }) {
  const [state, setState] = useState(false)

  const handleClick = (e) => {
    onClick(e)
    setState(!state)
  }

  return (
    <FaAngleRight
      size={20}
      className={"arrow" + (state ? " down" : "")}
      onClick={handleClick}
    />
  )
}

Arrow.propTypes = { onClick: PropTypes.func }
