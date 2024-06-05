import { selectBody } from "./bodySlice"
import { camelToFlat, filterBody } from "../../util/body-utils"
import routesColumnDefinitions from "../../util/routesColumnDefinitions"
import { orderColDefs } from "../../util/create-utils"
import Button from "../../components/Button"
import Input from "./input/Input"
import MiniData from "./MiniData"
import Row from "./Row"

import { useLocation } from "react-router-dom"
import { useState } from "react"
import { useSelector } from "react-redux"

export default function Create() {
  const route = useLocation().pathname.split("/")[1]
  const routeColDefs = routesColumnDefinitions[route]
  const { error: bodyError, ...body } = useSelector(selectBody)
  const [active, setActive] = useState({
    Ticket: true,
    Order: false,
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        console.log(body)
        filterBody(body)
        console.log(body, bodyError)
      }}
    >
      <div className="create">
        {orderColDefs(routeColDefs).map(
          (
            {
              accessorKey: property,
              meta: { isOriginal, isForeign, isForeigns },
            },
            index
          ) => {
            const header = camelToFlat(property)
            const props = { key: index, header }

            let content

            if (isForeign) {
              if (route === "transactions") {
                props.isActive = active[header]
                props.setActivity = () => {
                  const oppisiteHeader =
                    header === "Ticket" ? "Order" : "Ticket"
                  const newState = !active[header]

                  setActive(() => ({
                    [header]: newState,
                    [oppisiteHeader]: !newState,
                  }))
                }
              }

              content = <MiniData {...props} />
            } else if (isForeigns) {
              //
            } else {
              props.value = isOriginal || isForeign ? "Required" : "Optional"
              props.input = (
                <Input property={property} header={camelToFlat(property)} />
              )

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
