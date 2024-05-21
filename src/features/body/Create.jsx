import { camelToFlat } from "../../util/data-utils"
import routesColumnDefinitions from "../../util/routesColumnDefinitions"
import Input from "./input/Input"
import Row from "./Row"

import { useLocation } from "react-router-dom"

const orderColDefs = (colDefs) => {
  const foreign = []
  const originals = []
  const optionals = []
  const dates = []
  const foreigns = []
  const description = []

  for (const colDef of colDefs) {
    const {
      accessorKey: property,
      meta: { isOriginal, isOptional, isForeign, isForeigns },
    } = colDef

    if (property.slice(-2) === "At") {
      dates.push(colDef)
    } else if (property === "description") {
      description.push(colDef)
    } else if (isOriginal) {
      originals.push(colDef)
    } else if (isOptional) {
      optionals.push(colDef)
    } else if (isForeign) {
      foreign.push(colDef)
    } else if (isForeigns) {
      foreigns.push(colDef)
    }
  }

  return foreign.concat(originals, optionals, dates, foreigns, description)
}

export default function Create() {
  const route = useLocation().pathname.split("/")[1]
  const routeColDefs = routesColumnDefinitions[route]

  return (
    <div className="create">
      {orderColDefs(routeColDefs).map(
        ({ accessorKey: property, meta: { isOriginal, isForeign } }, index) => (
          // eslint-disable-next-line react/jsx-key
          <Row
            index={index}
            header={camelToFlat(property)}
            value={isOriginal || isForeign ? "Required" : "Optional"}
            input={<Input property={property} header={camelToFlat(property)} />}
          />
        )
      )}
    </div>
  )
}
