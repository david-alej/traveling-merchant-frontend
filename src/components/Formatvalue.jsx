import { findIndentyInformation } from "../util/data-utils"
import { formatFullDate, formatPhoneNumber, isIsoStr } from "../util/formatters"

import { Link } from "react-router-dom"

export default function FormatValue(property, value, miniTableName = "") {
  let formattedValue

  if (isIsoStr(value)) {
    formattedValue = <p>{formatFullDate(value)}</p>
  } else if (property === "phoneNumber") {
    formattedValue = <p>{formatPhoneNumber(value)}</p>
  } else if (Array.isArray(value)) {
    formattedValue = <p>{value.length}</p>
  } else if (typeof value === "object" && value !== null) {
    const { nameValue, id } = findIndentyInformation(value)

    formattedValue = (
      <Link to={`/${property.toLowerCase()}s/${id}`}>{nameValue}</Link>
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
