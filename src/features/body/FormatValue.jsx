import { getNameValue } from "../../util/data-utils"
import {
  formatFullDate,
  formatPhoneNumber,
  isIsoStr,
} from "../../util/formatters"

import { Link } from "react-router-dom"
import PropTypes from "prop-types"

export default function FormatValue({ property, value, miniTableName = "" }) {
  let formattedValue

  if (isIsoStr(value)) {
    formattedValue = <p>{formatFullDate(value)}</p>
  } else if (property === "phoneNumber") {
    formattedValue = <p>{formatPhoneNumber(value)}</p>
  } else if (Array.isArray(value)) {
    formattedValue = value.length

    if (typeof value[0] === "string") {
      formattedValue = value[0]

      for (let i = 1; i < value.length; i++) {
        formattedValue += `, ${value[i]}`
      }
    }

    formattedValue = <p>{formattedValue}</p>
  } else if (typeof value === "object" && value !== null) {
    const nameValue = getNameValue(value)
    const { id } = value

    formattedValue = (
      <Link to={`/${property.toLowerCase()}s/${id}`}>
        {nameValue.length > 40 ? nameValue.slice(0, 40) + "..." : nameValue}
      </Link>
    )
  } else if (
    !(
      miniTableName === "Wares Bought" ||
      miniTableName === "Wares Sold" ||
      miniTableName === "Bought" ||
      miniTableName === "Sold"
    ) &&
    property === "id" &&
    value
  ) {
    formattedValue = (
      <Link to={`/${miniTableName.toLowerCase()}/${value}`}>{value}</Link>
    )
  } else if (property.includes("Id") && value) {
    const route = property.slice(0, -2) + "s"

    formattedValue = <Link to={`/${route}/${value}`}>{value}</Link>
  } else {
    formattedValue = <p>{value}</p>
  }

  return formattedValue
}

FormatValue.propTypes = {
  property: PropTypes.string.isRequired,
  value: PropTypes.any,
  miniTableName: PropTypes.string,
}
