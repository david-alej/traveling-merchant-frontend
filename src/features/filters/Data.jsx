import { selectRouteFilters } from "./filtersSlice.js"
import { useGetDataQuery } from "../../util/query-util.jsx"
import { getPartialColumns } from "../../util/filters-util.jsx"
import Spinner from "../../components/Spinner.jsx"
import Table from "./Table.jsx"

import { useLocation } from "react-router-dom"
import { useSelector } from "react-redux"

export default function Data() {
  const route = useLocation().pathname.split("/")[1]
  const columns = getPartialColumns(route)
  const columnFilters = useSelector(selectRouteFilters(route))
  const { data, error, isFetching, isSuccess, isError } = useGetDataQuery(route)

  let content

  if (isFetching) {
    content = <Spinner />
  } else if (isError) {
    content = (
      <div>
        {Object.keys(error).map((key, index) => (
          <p key={index}>{`${key}: ${error[key]}`}</p>
        ))}
      </div>
    )
  } else if (isSuccess) {
    content = (
      <Table
        route={route}
        columns={columns}
        data={data}
        state={{ columnFilters }}
        hasFilters={true}
        hasActions={true}
      />
    )
  }

  return content
}
