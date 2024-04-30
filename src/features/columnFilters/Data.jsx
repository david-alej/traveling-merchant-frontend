import { useGetDataQuery } from "../../util/data-utils.jsx"
import Spinner from "../../components/Spinner.jsx"
import { formatFullDate, isIsoStr } from "../../util/formatters.js"
import "./Data.css"

import { useLocation, useParams } from "react-router-dom"
import { FaAngleDown } from "react-icons/fa"
import { useState } from "react"

const chooseDisplayValue = (value) => {
  let displayValue = value
  let isExtendedRow = false

  if (Array.isArray(value)) {
    // const columns = Object.keys(value[0])

    displayValue = ""
    //   (
    //   <table>
    //     <thead>
    //       <tr>
    //         {columns.map((header, index) => (
    //           <th key={index}>
    //             <div className="header-cell">
    //               <div className="header-text">{header}</div>
    //             </div>
    //           </th>
    //         ))}
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {value.map((object, index) => (
    //         <tr key={index}>
    //           {columns.map((column, columnIndex) => (
    //             <td key={columnIndex}>{chooseDisplayValue(object[column])}</td>
    //           ))}
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // )
  } else if (isIsoStr(value)) {
    displayValue = formatFullDate(value)
  } else if (typeof value === "object" && value !== null) {
    displayValue = Object.keys(value).map((property, index) => (
      <div className="sub-row" key={index}>
        <div className="sub-property">{property}</div>
        <div className="sub-value">{chooseDisplayValue(value[property])}</div>
      </div>
    ))

    isExtendedRow = true
  }

  return [displayValue, isExtendedRow]
}

export default function Data() {
  const { id } = useParams()
  const { pathname } = useLocation()
  const route = pathname.split("/")[1]
  const [selectIsOpened, setSelectIsOpened] = useState(false)

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
      <div className="data">
        {Object.keys(data).map((property, index) => {
          const [displayValue, isExtendedRow] = chooseDisplayValue(
            data[property]
          )

          return (
            <div key={index} className={isExtendedRow ? "extended-row" : "row"}>
              <div className="property">
                {isExtendedRow && (
                  <div
                    className="arrow"
                    onClick={() => setSelectIsOpened(!selectIsOpened)}
                  >
                    <FaAngleDown size={20} />
                  </div>
                )}
                <div className="property-text">{property}</div>
              </div>
              <div className={"value" + (selectIsOpened ? " open" : "")}>
                {displayValue}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  return <>{content}</>
}
