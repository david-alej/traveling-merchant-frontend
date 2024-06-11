import { useGetDataQuery } from "../../util/query-utils"
import { getColumns } from "../../util/body-utils"
import ActionButton from "../../components/ActionButton"
import Spinner from "../../components/Spinner"
import Delete from "./Delete"
import "./Data.css"

import { Outlet } from "react-router-dom"
import { useParams, useLocation } from "react-router-dom"
import { useState } from "react"

export default function Data() {
  const { id } = useParams()
  const route = useLocation().pathname.split("/")[1]
  const currentAction = useLocation().pathname.split("/")[3] || "view"
  const columns = getColumns(route)
  const [popUp, setPopUp] = useState()

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
    content = <Outlet context={[columns, data]} />
  }

  return (
    <>
      <div className="data-headers">
        {["view", "edit", "delete"].map((action, index) => {
          const props = {
            className:
              "data-header" + (action === currentAction ? " active" : ""),
            type: action,
            route: route,
            id: parseInt(id),
            text: action[0].toUpperCase() + action.slice(1),
            isTrashIcon: action === "delete",
          }

          if (action === "delete") {
            props.onClick = () => {
              setPopUp(
                <Delete
                  columns={columns}
                  data={data}
                  closePopUp={() => setPopUp(undefined)}
                />
              )
            }
          }

          return <ActionButton key={index} {...props} />
        })}
      </div>
      {content}
      {popUp}
    </>
  )
}
