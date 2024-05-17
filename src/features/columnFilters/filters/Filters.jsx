import SearchFilter from "./SearchFilter"
import MultiSelectFilter from "./MultiSelectFilter"
import SelectFilter from "./SelectFilter"
import EqualitiesFilter from "./EqualitiesFilter"
import routesColumnDefinitions from "../../../util/routesColumnDefinitions"

import PropTypes from "prop-types"
import { useSelector } from "react-redux"
import { selectRouteColumnFilters } from "../columnFiltersSlice"
import { useLocation } from "react-router-dom"

export default function Filters({ table }) {
  const route = useLocation().pathname.split("/")[1]

  const columnFilters = useSelector(selectRouteColumnFilters(route))

  const columns = routesColumnDefinitions[route]

  return (
    <div className="filters">
      {columnFilters.map((columnFilter) => {
        const {
          accessorKey: id,
          header,
          meta: { dataType },
        } = columns.find((column) => column.accessorKey === columnFilter.id)

        let content

        if (dataType === "str" || dataType === "obj") {
          content = <SearchFilter header={header} columnFilter={columnFilter} />
        } else if (dataType === "type" || dataType === "itr") {
          const flattendArray = table
            .getCoreRowModel()
            .flatRows.flatMap((row) => row.getValue(id))

          const uniqueValues = Array.from(new Set(flattendArray))

          content =
            dataType === "type" ? (
              <SelectFilter
                uniqueValues={uniqueValues}
                columnFilter={columnFilter}
              />
            ) : (
              <MultiSelectFilter
                uniqueValues={uniqueValues}
                columnFilter={columnFilter}
              />
            )
        } else if (
          dataType === "int" ||
          dataType === "num" ||
          dataType === "date" ||
          dataType === "len"
        ) {
          content = (
            <EqualitiesFilter header={header} columnFilter={columnFilter} />
          )
        }

        return (
          <div key={columnFilter.id} className="filter">
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
