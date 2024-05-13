import ActionButton from "../ActionButton.jsx"
import "./Data.css"

import { Outlet } from "react-router-dom"
import { useParams, useLocation } from "react-router-dom"

export default function Data() {
  const { id } = useParams()
  const route = useLocation().pathname.split("/")[1]

  const currentAction = useLocation().pathname.split("/")[3] || "view"

  return (
    <>
      <div className="data-headers">
        {["view", "edit", "delete"].map((action, index) => (
          <ActionButton
            key={index}
            className={
              "data-header" + (action === currentAction ? " active" : "")
            }
            type={action}
            route={route}
            id={id}
            text={action[0].toUpperCase() + action.slice(1)}
            isTrashIcon={action === "delete"}
          />
        ))}
      </div>
      <Outlet />
    </>
  )
}
