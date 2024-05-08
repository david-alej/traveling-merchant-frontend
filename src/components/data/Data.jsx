import EditButton from "../EditButton.jsx"
import DeleteButton from "../DeleteButton.jsx"
import ViewButton from "./ViewButton.jsx"
import "./Data.css"

import { Outlet, useNavigate } from "react-router-dom"
import { useParams, useLocation } from "react-router-dom"

export default function Data() {
  const navigate = useNavigate()
  const { id } = useParams()
  const route = useLocation().pathname.split("/")[1]
  const currentAction = useLocation().pathname.split("/")[3] || "view"

  return (
    <>
      <div className="data-headers">
        {["view", "edit", "delete"].map((action, index) => (
          <div
            key={index}
            className={
              `${action} data-header` +
              (action === currentAction ? " active" : "")
            }
            onClick={() =>
              navigate(
                `/${route}/${id}` + (action === "view" ? "" : "/" + action)
              )
            }
          >
            <p className={`${action}-text`}>
              {action[0].toUpperCase() + action.slice(1)}
            </p>
            {action === "view" ? (
              <ViewButton />
            ) : action === "edit" ? (
              <EditButton />
            ) : (
              <DeleteButton isTrashIcon={true} />
            )}
          </div>
        ))}
      </div>
      <Outlet />
    </>
  )
}
