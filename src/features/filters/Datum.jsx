import { selectRouteFilters } from "./filtersSlice.js"
import { useGetDatumQuery } from "../../util/query-utils.jsx"
import { getPartialColumns } from "../../util/filters-utils.jsx"
import Spinner from "../../components/Spinner.jsx"
import Table from "./Table.jsx"
import "./Datum.css"

import { useLocation } from "react-router-dom"
import { useSelector } from "react-redux"

export default function Datum() {
  const route = useLocation().pathname.split("/")[1]
  const columns = getPartialColumns(route)
  const filters = useSelector(selectRouteFilters(route))
  const { data, error, isFetching, isSuccess, isError } =
    useGetDatumQuery(route)

  let content

  if (isFetching) {
    content = <Spinner />
  } else if (isError) {
    content = <div>{error.toString()}</div>
  } else if (isSuccess) {
    content = (
      <Table
        route={route}
        columns={columns}
        data={data}
        state={{ filters }}
        hasExtraOptions={true}
        hasActions={true}
      />
    )
  }

  return content
}
