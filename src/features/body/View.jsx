import {
  camelToFlat,
  isArray,
  isObject,
  orderProperties,
} from "../../util/data-utils"
import MiniTable from "./MiniTable.jsx"
import MiniData from "./MiniData.jsx"
import { useGetDataQuery } from "../../util/query-utils.jsx"
import Spinner from "../../components/Spinner.jsx"
import Row from "./Row.jsx"

import { useLocation, useParams } from "react-router-dom"

export default function View() {
  const { id } = useParams()
  const route = useLocation().pathname.split("/")[1]

  const { data, error, isFetching, isSuccess, isError } = useGetDataQuery(
    route,
    id
  )

  let content

  if (isFetching) {
    content = <Spinner />
  } else if (isError) {
    content = <div>{error.toString()}</div>
  } else if (isSuccess) {
    const properties = orderProperties(data)

    content = (
      <div className="data" key={route}>
        {properties.map((property, index) => {
          const value = data[property]
          const header = camelToFlat(property)
          const props = { index, property, value, header }

          let row

          if (isArray(value) && typeof value[0] === "object") {
            const routeReferenceId = route.slice(0, -1) + "Id"

            row = <MiniTable {...props} excludedId={routeReferenceId} />
          } else if (isObject(value)) {
            row = <MiniData {...props} />
          } else {
            row = <Row {...props} />
          }

          return row
        })}
      </div>
    )
  }

  return content
}
