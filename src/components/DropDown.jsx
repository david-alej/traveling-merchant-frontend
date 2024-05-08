import "./DropDown.css"

import PropTypes from "prop-types"
import { useState } from "react"
import { FaAngleDown } from "react-icons/fa"
import { MdOutlineClear } from "react-icons/md"

export default function DropDown({
  value,
  options,
  onMakeValue,
  onClearValue,
}) {
  const [selectIsOpened, setSelectIsOpened] = useState(false)

  return (
    <div className="select-container">
      <div className={"custom-select single" + (selectIsOpened ? " open" : "")}>
        <div className="select-box">
          {value.length > 0 && (
            <div className="select-filter-clear-icon" onClick={onClearValue}>
              <MdOutlineClear />
            </div>
          )}
          <span className="selected-option" key={value}>
            {value}
          </span>

          <div
            className="arrow"
            onClick={() => setSelectIsOpened(!selectIsOpened)}
          >
            <FaAngleDown size={20} />
          </div>
        </div>
        <div className="options">
          {options.map((option) => (
            <div
              className={"option" + (value === option ? " active" : "")}
              value={option}
              key={option}
              onClick={onMakeValue(option)}
            >
              {option}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

DropDown.propTypes = {
  value: PropTypes.any.isRequired,
  options: PropTypes.array.isRequired,
  onMakeValue: PropTypes.func.isRequired,
  onClearValue: PropTypes.func.isRequired,
}
