import {
  camelToFlat,
  isArray,
  isObject,
  orderProperties,
} from "../../util/data-utils"
import RegularValue from "./RegularValue.jsx"
import MiniTable from "./MiniTable.jsx"
import MiniData from "./MiniData.jsx"
import { useGetDataQuery } from "../../util/query-utils.jsx"
import Spinner from "../Spinner.jsx"

import { useLocation, useParams } from "react-router-dom"
import PropTypes from "prop-types"

const isEditableProperty = (property, value) =>
  !(
    isObject(value) ||
    Array.isArray(value) ||
    property === "id" ||
    property === "updatedAt" ||
    property === "createdAt"
  )

export default function View({ body, onChangeBody }) {
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
      <div className="data">
        {properties.map((property, index) => {
          const routeReferenceId = route.slice(0, -1) + "Id"
          const value = data[property]
          const header = camelToFlat(property)
          const props = { index, property, value, header, routeReferenceId }

          let row

          if (isArray(value)) {
            if (typeof value[0] === "string") {
              let arrStr = value[0]

              for (let i = 1; i < value.length; i++) {
                arrStr += ", " + value[parseInt(i)]
              }

              props.value = arrStr

              row = <RegularValue {...props} />
            } else {
              row = <MiniTable {...props} excludedId={routeReferenceId} />
            }
          } else if (isObject(value)) {
            row = <MiniData {...props} />
          } else {
            if (body && onChangeBody && isEditableProperty(property, value)) {
              props.onChangeBody = onChangeBody
            }

            row = <RegularValue {...props} />
          }

          return row
        })}
      </div>
    )
  }

  return content
}

View.propTypes = { body: PropTypes.object, onChangeBody: PropTypes.func }
