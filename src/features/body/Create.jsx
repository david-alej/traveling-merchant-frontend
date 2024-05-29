import { camelToFlat } from "../../util/data-utils"
import routesColumnDefinitions from "../../util/routesColumnDefinitions"
import { orderColDefs } from "../../util/create-utils"
import Button from "../../components/Button"
import Input from "./input/Input"
import MiniData from "./MiniData"
import Row from "./Row"

import { useLocation } from "react-router-dom"
import { useState } from "react"

export default function Create() {
  const route = useLocation().pathname.split("/")[1]
  const routeColDefs = routesColumnDefinitions[route]
  const [active, setActive] = useState({
    Ticket: true,
    Order: false,
  })

  return (
    <form>
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
                const newHeader = header.slice(0, -3)
                props.header = newHeader
                props.isActive = active[newHeader]
                props.setActivity = () => {
                  const oppisiteHeader =
                    newHeader === "Ticket" ? "Order" : "Ticket"
                  const newState = !active[newHeader]

                  setActive(() => ({
                    [newHeader]: newState,
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
