import { changeValue } from "../filtersSlice"
import Button from "../../../components/Button"
import "./SearchFilter.css"

import PropTypes from "prop-types"
import { LiaSearchSolid } from "react-icons/lia"
import { MdOutlineClear } from "react-icons/md"
import { useDispatch } from "react-redux"
import { useLocation } from "react-router-dom"

export default function SearchFilter({ header, filter: { id, value } }) {
  const dispatch = useDispatch()
  const route = useLocation().pathname.split("/")[1]

  const onFilterChange = (id) => (e) =>
    dispatch(changeValue({ route, id, value: e.target.value }))

  const onSearchClearHandler = (id) => () =>
    dispatch(changeValue({ route, id, value: "" }))

  return (
    <div className="search-filter-container">
      <div className="search-box">
        {value?.length > 0 ? (
          <Button
            onClick={onSearchClearHandler(id)}
            type="button"
            className="search-filter-clear-button"
            icon={<MdOutlineClear />}
          />
        ) : (
          <div className="search-filter-icon">
            <LiaSearchSolid />
          </div>
        )}
        <input
          className="search-filter"
          type="text"
          value={value}
          onChange={onFilterChange(id)}
          placeholder={`Search by ${header}`}
        />
      </div>
    </div>
  )
}

SearchFilter.propTypes = {
  header: PropTypes.string.isRequired,
  filter: PropTypes.object.isRequired,
}
