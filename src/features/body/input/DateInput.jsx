import { selectBodyProperty } from "../bodySlice"
import { changeValue } from "../bodySlice"

import PropTypes from "prop-types"
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker"
import { useDispatch, useSelector } from "react-redux"
import dayjs from "dayjs"

export default function DateInput({ value, property }) {
  const dispatch = useDispatch()
  const date = useSelector(selectBodyProperty(property))

  const handleChange = (newValue) =>
    dispatch(changeValue({ property, value: newValue.toJSON() }))

  return (
    <DateTimePicker
      className="date"
      defaultValue={dayjs(value)}
      value={dayjs(date)}
      onChange={handleChange}
      format="MMM DD YYYY hh:mm A"
    />
  )
}

DateInput.propTypes = {
  property: PropTypes.string.isRequired,
  value: PropTypes.any,
}
