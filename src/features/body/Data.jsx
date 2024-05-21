import { reset } from "./bodySlice"
import ActionButton from "../../components/ActionButton"
import "./Data.css"

import { Outlet } from "react-router-dom"
import { useParams, useLocation } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

export default function Data() {
  const dispatch = useDispatch()
  const { id } = useParams()
  const route = useLocation().pathname.split("/")[1]
  const currentAction = useLocation().pathname.split("/")[3] || "view"

  useEffect(() => {
    dispatch(reset())
  }, [dispatch, route])

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
            id={parseInt(id)}
            text={action[0].toUpperCase() + action.slice(1)}
            isTrashIcon={action === "delete"}
          />
        ))}
      </div>
      <Outlet />
    </>
  )
}
