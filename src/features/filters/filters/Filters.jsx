import SearchFilter from "./SearchFilter"
import MultiSelectFilter from "./MultiSelectFilter"
import SelectFilter from "./SelectFilter"
import EqualitiesFilter from "./EqualitiesFilter"
import routesColumnDefinitions from "../../../util/routesColumnDefinitions"

import PropTypes from "prop-types"
import { useSelector } from "react-redux"
import { selectRouteFilters } from "../filtersSlice"
import { useLocation } from "react-router-dom"

export default function Filters({ table }) {
  const route = useLocation().pathname.split("/")[1]

  const filters = useSelector(selectRouteFilters(route))

  const columns = routesColumnDefinitions[route]

  return (
    <div className="filters">
      {filters.map((filter) => {
        const {
          accessorKey: id,
          header,
          meta: { dataType },
        } = columns.find((column) => column.accessorKey === filter.id)
        const props = { header, filter }

        let content

        if (dataType === "str" || dataType === "obj") {
          content = <SearchFilter {...props} />
        } else if (dataType === "type" || dataType === "itr") {
          const flattendArray = table
            .getCoreRowModel()
            .flatRows.flatMap((row) => row.getValue(id))

          const uniqueValues = Array.from(new Set(flattendArray))

          content =
            dataType === "type" ? (
              <SelectFilter uniqueValues={uniqueValues} {...props} />
            ) : (
              <MultiSelectFilter uniqueValues={uniqueValues} {...props} />
            )
        } else if (
          dataType === "int" ||
          dataType === "num" ||
          dataType === "date" ||
          dataType === "len"
        ) {
          content = <EqualitiesFilter {...props} />
        }

        return (
          <div key={filter.id} className="filter">
            <strong>{header + ": "}</strong>
            <div className="filter-break" />
            {content}
          </div>
        )
      })}
    </div>
  )
}

Filters.propTypes = {
  table: PropTypes.object.isRequired,
}
