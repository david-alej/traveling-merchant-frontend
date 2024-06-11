import { getColumns, isEditable } from "../../util/body-utils.jsx"
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
  const actionIsEdit = action === "edit"
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
            header,
            meta: { dataType },
            cell,
          } = colDef
          let value = data[property]
          const props = { key: index, property, value, header, cell }

          let row

          if (dataType === "arr") {
            row = (
              <MiniTable
                {...props}
                canInput={actionIsEdit && header.slice(0, 5) === "Wares"}
              />
            )
          } else if (dataType === "obj") {
            if (route === "transactions" && actionIsEdit) {
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
            if (actionIsEdit && isEditable(route, property)) {
              props.input = <Input {...props} />
            }

            props.value = cell({ getValue: () => value })

            row = <Row {...props} />
          }

          return row
        })}
      </div>
    )
  }

  return content
}
