import { selectBodyProperty } from "../bodySlice"
import { changeValue } from "../bodySlice"

import PropTypes from "prop-types"
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker"
import { useDispatch, useSelector } from "react-redux"
import dayjs from "dayjs"
import { useState } from "react"
import Button from "../../../components/Button"

export default function DateInput({ value, property }) {
  const dispatch = useDispatch()
  const date = useSelector(selectBodyProperty(property))
  const [dateOn, setDateOn] = useState(false)

  const handleChange = (newValue) =>
    dispatch(
      changeValue({
        property,
        value: newValue.toJSON() === value ? undefined : newValue.toJSON(),
      })
    )

  const clearDate = () => dispatch(changeValue({ property, value: undefined }))

  return (
    <div className="date-input">
      <Button
        type="button"
        className="data-input-button"
        onClick={() => {
          clearDate()
          setDateOn(!dateOn)
        }}
        text={dateOn ? "Date On" : "Date Off"}
      />
      <DateTimePicker
        className="date"
        value={date ? dayjs(date) : dayjs(value)}
        onChange={handleChange}
        format="MMM DD YYYY hh:mm A"
        disabled={!dateOn}
      />
    </div>
  )
}

DateInput.propTypes = {
  property: PropTypes.string.isRequired,
  value: PropTypes.any,
}
