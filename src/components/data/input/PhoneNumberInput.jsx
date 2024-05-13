import { formatPhoneNumber } from "../../../util/formatters"

import PropTypes from "prop-types"
import { useRef, useState } from "react"

const formatValue = (value) => {
  let formattedNumber = ""
  const digits = value.replace(/[^0-9]/g, "")
  const length = digits?.length

  const areaCode = () => `(${digits.slice(0, 3)})`

  if (length > 0) formattedNumber = areaCode()

  if (length >= 4) formattedNumber += digits.slice(3, 6)

  if (length >= 7) formattedNumber += `-${digits.slice(6, 10)}`

  return formattedNumber
}

export default function PhoneNumberInput({ value }) {
  const [phoneNumber, setPhoneNumber] = useState("")
  const ref = useRef(null)

  const handleSetPhoneNumber = ({ target }) => {
    const { value, selectionStart, selectionEnd } = target
    const formattedNumber = formatValue(value)
    setPhoneNumber(formattedNumber)

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
      value={phoneNumber}
      onChange={handleSetPhoneNumber}
      maxLength="14"
      required
    ></input>
  )
}

PhoneNumberInput.propTypes = {
  value: PropTypes.any,
}
