import { selectBody } from "./bodySlice"
import { checkCreateBody } from "../../util/body-utils"
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
  const fullBody = useSelector(selectBody)
  const [active, setActive] = useState({
    ticket: true,
    order: false,
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        console.log(fullBody)
      }}
    >
      <div className="create">
        {routeColDefs.map(
          (
            {
              accessorKey: property,
              header,
              meta: { isOriginal, isOptional, isForeign, isForeigns },
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
            } else if (isOriginal || isOptional) {
              props.input = <Input property={property} header={header} />
              if (isOptional) props.value = "Optional"

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
          disabled={checkCreateBody(fullBody)}
        />
      </div>
    </form>
  )
}
