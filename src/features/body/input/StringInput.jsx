import PropTypes from "prop-types"
import { useEffect, useRef, useState } from "react"
import { validate } from "email-validator"
import { useDispatch, useSelector } from "react-redux"
import {
  changeValue,
  changeError,
  selectBodyProperty,
  selectErrorProperty,
} from "../bodySlice"

export default function StringInput({ property, value, isEmail }) {
  const dispatch = useDispatch()
  const string = useSelector(selectBodyProperty(property))
  const emailError = useSelector(selectErrorProperty("email"))
  const [width, setWidth] = useState("25%")
  const span = useRef()

  useEffect(() => {
    if (span.current) {
      const parentWidth = span.current.parentElement.offsetWidth
      const minWidth = parentWidth / 2
      const newWidth = `${Math.min(
        Math.max(minWidth, span.current.offsetWidth + 2),
        parentWidth
      )}px`
      setWidth(newWidth)
    }
  }, [string])

  const handleStringChange = ({ target }) =>
    dispatch(changeValue({ property, value: target.value }))

  const handleEmailChange = ({ target }) => {
    const { value } = target

    dispatch(changeError({ property: "email", value: !validate(value) }))
    dispatch(changeValue({ property, value }))
  }

  return (
    <>
      <input
        placeholder={value}
        value={string}
        onChange={isEmail ? handleEmailChange : handleStringChange}
        style={{ width }}
      />
      <span id="hidden-span" ref={span}>
        {string}
      </span>
      {emailError && <span className="error">Email is not a valid.</span>}
    </>
  )
}

StringInput.propTypes = {
  property: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  isEmail: PropTypes.bool,
}
