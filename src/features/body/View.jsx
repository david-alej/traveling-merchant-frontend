import { camelToFlat, getColumns, isEditable } from "../../util/body-utils.jsx"
import { useGetDataQuery } from "../../util/query-utils.jsx"
import Spinner from "../../components/Spinner.jsx"
import MiniTable from "./MiniTable.jsx"
import MiniData from "./MiniData.jsx"
import Row from "./Row.jsx"
import Input from "./input/Input.jsx"

import { useLocation, useParams } from "react-router-dom"
import { useState } from "react"

export default function View() {
  const { id } = useParams()
  const path = useLocation().pathname.split("/")
  const route = path[1]
  const action = path.at(-1) || "view"
  const columns = getColumns(route)

  const { data, error, isFetching, isSuccess, isError } = useGetDataQuery(
    route,
    id
  )

  const [active, setActive] = useState({
    Ticket: data?.ticket ? true : false,
    Order: data?.order ? true : false,
  })

  let content

  if (isFetching) {
    content = <Spinner />
  } else if (isError) {
    content = <div>{error.toString()}</div>
  } else if (isSuccess) {
    content = (
      <div className="data" key={`${route}-${id}`}>
        {columns.map((colDef, index) => {
          const {
            accessorKey: property,
            meta: { dataType },
            cell,
          } = colDef
          let value = data[property]
          const header = camelToFlat(property)
          const props = { key: index, value, header }

          let row

          if (dataType === "len") {
            const routeReferenceId = route.slice(0, -1) + "Id"

            row = <MiniTable {...props} excludedId={routeReferenceId} />
          } else if (dataType === "obj") {
            if (route === "transactions" && action === "edit") {
              props.isActive = active[header]
              props.setActivity = () => {
                const oppisiteHeader = header === "Ticket" ? "Order" : "Ticket"
                const newState = !active[header]

                setActive(() => ({
                  [header]: newState,
                  [oppisiteHeader]: !newState,
                }))
              }
            }

            row = <MiniData {...props} />
          } else {
            props.value =
              property === "id"
                ? value
                : cell
                ? cell({ getValue: () => value })
                : value

            if (action === "edit" && isEditable(route, property)) {
              props.input = <Input property={property} value={value} />
            }

            row = <Row {...props} />
          }

          return row
        })}
      </div>
    )
  }

  return content
}
