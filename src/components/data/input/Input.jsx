import { isIsoStr } from "../../../util/formatters"
import PhoneNumberInput from "./PhoneNumberInput"
import DateInput from "./DateInput"
import StringInput from "./StringInput"
import NumberInput from "./NumberInput"
import TagsInput from "./TagsInput"
import "./Input.css"

import PropTypes from "prop-types"
import EmailInput from "./EmailInput"

const allStrColumns = ["description", "paymentPlan", "address"]
const allNumColumns = ["cost", "payment", "unitPrice", "tax", "shipment"]

export default function Input({ property, value, body, onChangeBody }) {
  const lowerCase = property.toLowerCase()
  let content = <></>

  if (isIsoStr(value) || property.slice(-2) === "At") {
    content = <DateInput value={value} />
  } else if (property === "phoneNumber") {
    content = <PhoneNumberInput value={value} />
  } else if (property === "email") {
    content = <EmailInput value={value} />
  } else if (property === "tags") {
    content = <TagsInput value={value} />
  } else if (allNumColumns.includes(property)) {
    content = <NumberInput value={value} />
  } else if (
    lowerCase.includes("name") ||
    lowerCase.includes("type") ||
    allStrColumns.includes(property)
  ) {
    content = <StringInput value={value} />
  }

  return <div className="input">{content}</div>
}

Input.propTypes = {
  property: PropTypes.string.isRequired,
  value: PropTypes.any,
  header: PropTypes.string.isRequired,
  body: PropTypes.object,
  onChangeBody: PropTypes.func,
}
