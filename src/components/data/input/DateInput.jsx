import PropTypes from "prop-types"
import { useState } from "react"
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker"
import dayjs from "dayjs"

export default function DateInput({ value }) {
  const [date, setDate] = useState(dayjs(value))

  return (
    <DateTimePicker
      className="date"
      value={date}
      onChange={(newValue) => setDate(newValue)}
      format="MMM DD YYYY hh:mm A"
    />
  )
}

DateInput.propTypes = {
  value: PropTypes.any,
}
