import { selectBody } from "./bodySlice"
import { camelToFlat, checkForErrors } from "../../util/body-utils"
import routesColumnDefinitions from "../../util/routesColumnDefinitions"
import Button from "../../components/Button"
import Input from "./input/Input"
import MiniData from "./MiniData"
import MiniTable from "./MiniTable"
import Row from "./Row"

import { useLocation } from "react-router-dom"
import { useState } from "react"
import { useSelector } from "react-redux"

export default function Create() {
  const route = useLocation().pathname.split("/")[1]
  const routeColDefs = routesColumnDefinitions[route]
  const { errors: bodyError, requirments, ...body } = useSelector(selectBody)
  const [active, setActive] = useState({
    Ticket: true,
    Order: false,
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        console.log(body, bodyError, requirments, checkForErrors(bodyError))
      }}
    >
      <div className="create">
        {routeColDefs.map(
          (
            {
              accessorKey: property,
              header,
              meta: { isOriginal, isForeign, isForeigns },
            },
            index
          ) => {
            const props = { key: index, property, header, value: "Required" }

            let content

            if (isForeign) {
              if (route === "transactions") {
                props.isActive = active[property]
                props.setActivity = () => {
                  const oppisiteHeader =
                    property === "ticket" ? "order" : "ticket"
                  const newState = !active[property]

                  setActive(() => ({
                    [property]: newState,
                    [oppisiteHeader]: !newState,
                  }))
                }
              }

              content = <MiniData {...props} />
            } else if (isForeigns) {
              content = header.includes("Wares") ? (
                <MiniTable {...props} canInput={true} />
              ) : (
                content
              )
            } else {
              props.input = (
                <Input property={property} header={camelToFlat(property)} />
              )
              if (!isOriginal) props.value = "Optional"

              content = <Row {...props} />
            }

            return content
          }
        )}
      </div>
      <div className="submit-edit">
        <Button
          type="submit"
          className="submit-button"
          text="Submit"
          // disabled={checkForErrors(bodyError)}
        />
      </div>
      {/* {checkForErrors(bodyError) && <span>Please fill valid inputs above</span>} */}
    </form>
  )
}
