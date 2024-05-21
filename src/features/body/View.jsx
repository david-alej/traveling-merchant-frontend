import {
  camelToFlat,
  isArray,
  isObject,
  orderProperties,
  isEditable,
} from "../../util/data-utils"
import { useGetDataQuery } from "../../util/query-utils.jsx"
import MiniTable from "./MiniTable.jsx"
import MiniData from "./MiniData.jsx"
import Spinner from "../../components/Spinner.jsx"
import FormatValue from "./FormatValue"
import Row from "./Row.jsx"
import Input from "./input/Input.jsx"

import { useLocation, useParams } from "react-router-dom"

export default function View() {
  const { id } = useParams()
  const route = useLocation().pathname.split("/")[1]
  const action = useLocation().pathname.split("/").at(-1) || "view"

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
      <div className="data" key={`${route}-${id}`}>
        {properties.map((property, index) => {
          let value = data[property]
          const header = camelToFlat(property)
          const props = { index, value, header }

          let row

          if (isArray(value) && typeof value[0] === "object") {
            const routeReferenceId = route.slice(0, -1) + "Id"

            row = <MiniTable {...props} excludedId={routeReferenceId} />
          } else if (isObject(value)) {
            row = <MiniData {...props} />
          } else {
            props.value =
              property === "id" ? (
                value
              ) : (
                <FormatValue property={property} value={value} />
              )

            if (action === "edit" && isEditable(route, property)) {
              props.input = (
                <Input property={property} value={value} header={header} />
              )
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
