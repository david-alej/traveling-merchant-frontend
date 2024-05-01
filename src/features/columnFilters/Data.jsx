import { useGetDataQuery } from "../../util/query-utils.jsx"
import Spinner from "../../components/Spinner.jsx"
import {
  camelToFlat,
  isArray,
  isObject,
  orderProperties,
} from "../../util/data-utils.jsx"
import FormatValue from "../../components/Formatvalue.jsx"
import "./Data.css"

import { useLocation, useParams } from "react-router-dom"
import PropTypes from "prop-types"
import MiniTable from "../../components/MiniTable.jsx"
import MiniData from "../../components/MiniData.jsx"

function RegularValue({ index, property, header, value }) {
  return (
    <div key={index} className="row">
      <div className="header">
        <div className="header-text">{header}</div>
      </div>
      <div className="value">
        {property === "id" ? value : FormatValue(property, value)}
      </div>
    </div>
  )
}

RegularValue.propTypes = {
  index: PropTypes.number.isRequired,
  property: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  header: PropTypes.string.isRequired,
}

export default function Data() {
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
            row = <RegularValue {...props} />
          }

          return row
        })}
      </div>
    )
  }

  return <>{content}</>
}
