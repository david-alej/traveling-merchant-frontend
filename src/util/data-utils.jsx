import { formatFullDate, formatPhoneNumber, isIsoStr } from "./formatters"

import { Link } from "react-router-dom"

export const camelToFlat = (property) => {
  const camelCase = property.replace(/([a-z])([A-Z])/g, "$1 $2").split(" ")

  let flat = ""

  camelCase.forEach((word) => {
    flat = flat + word.charAt(0).toUpperCase() + word.slice(1) + " "
  })

  return flat.slice(0, -1)
}

export const formatValue = (property, value, miniTableName = "") => {
  let formattedValue

  if (isIsoStr(value)) {
    formattedValue = formatFullDate(value)
  } else if (property === "phoneNumber") {
    formattedValue = formatPhoneNumber(value)
  } else if (Array.isArray(value)) {
    formattedValue = value.length
  } else if (typeof value === "object" && value !== null) {
    const nameKey =
      Object.keys(value).find((key) => key.toLowerCase().includes("name")) ||
      "id"
    const { id, [nameKey]: name } = value

    formattedValue = (
      <Link to={`/${property.toLowerCase()}s/${id}`}>{name}</Link>
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
    formattedValue = value
  }

  return formattedValue
}
