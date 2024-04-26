import { useGetDataQuery } from "../../util/data-utils.jsx"
import Spinner from "../../components/Spinner.jsx"
import { formatFullDate, isIsoStr } from "../../util/formatters.js"
import "./Data.css"

import { useLocation, useParams } from "react-router-dom"

export default function Data() {
  const { id } = useParams()
  const { pathname } = useLocation()
  const route = pathname.split("/")[1]

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
    content = (
      <div>
        <div>{route.slice(0, -1)}</div>
        <div className="data">
          {Object.keys(data).map((property, index) => {
            const value = data[property]

            let content

            if (Array.isArray(value)) {
              content = ""
            } else if (isIsoStr(value)) {
              content = (
                <>
                  <div className="property">{property}</div>
                  <div className="value">{formatFullDate(value)}</div>
                </>
              )
            } else if (typeof value === "object" && value !== null) {
              content = ""
            } else {
              console.log(value)
              content = (
                <>
                  <div className="property">{property}</div>
                  <div className="value">{value}</div>
                </>
              )
            }

            return (
              <div key={index} className="row">
                {content}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return <>{content}</>
}
