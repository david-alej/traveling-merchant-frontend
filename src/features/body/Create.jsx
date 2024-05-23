import { camelToFlat } from "../../util/data-utils"
import routesColumnDefinitions from "../../util/routesColumnDefinitions"
import { orderColDefs } from "../../util/create-utils"
import Button from "../../components/Button"
import Input from "./input/Input"
import Row from "./Row"

import { useLocation } from "react-router-dom"
import ForeignInput from "./input/ForeignInput"
import MiniData from "./MiniData"

export default function Create() {
  const route = useLocation().pathname.split("/")[1]
  const routeColDefs = routesColumnDefinitions[route]

  return (
    <form>
      <div className="create">
        {orderColDefs(routeColDefs).map(
          (
            { accessorKey: property, meta: { isOriginal, isForeign } },
            index
          ) => {
            const header = camelToFlat(property)

            let content

            if (isForeign) {
              content = <MiniData index={index} header={header} />
            } else {
              content = (
                <Row
                  index={index}
                  header={header}
                  value={isOriginal || isForeign ? "Required" : "Optional"}
                  input={
                    <Input property={property} header={camelToFlat(property)} />
                  }
                />
              )
            }

            return <>{content}</>
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
