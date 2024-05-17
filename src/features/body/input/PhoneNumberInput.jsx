import { formatPhoneNumber } from "../../../util/formatters"
import { changeValue, selectBodyProperty } from "../bodySlice"

import PropTypes from "prop-types"
import { useRef } from "react"
import { useDispatch, useSelector } from "react-redux"

export default function PhoneNumberInput({ property, value }) {
  const dispatch = useDispatch()
  const phoneNumber = useSelector(selectBodyProperty(property))
  const ref = useRef(null)

  const handleChange = ({ target }) => {
    const { value, selectionStart, selectionEnd } = target
    const digits = value.replace(/[^0-9]/g, "")

    dispatch(changeValue({ property, value: digits }))

    const formattedNumber = formatPhoneNumber(digits)

    setTimeout(() => {
      if (ref.current) {
        const position =
          formattedNumber.indexOf(value[selectionStart - 1], selectionEnd - 1) +
            1 || selectionEnd
        ref.current.setSelectionRange(position, position)
      }
    }, 0)
  }

  return (
    <input
      className="phone-number"
      ref={ref}
      type="tel"
      name="phone"
      placeholder={formatPhoneNumber(value)}
      value={formatPhoneNumber(phoneNumber)}
      onChange={handleChange}
      maxLength="14"
      required
    ></input>
  )
}

PhoneNumberInput.propTypes = {
  property: PropTypes.string.isRequired,
  value: PropTypes.any,
}
