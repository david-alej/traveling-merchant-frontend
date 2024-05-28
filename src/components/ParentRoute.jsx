import { Outlet, useLocation } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { reset } from "../features/body/bodySlice"

function ParentRoute() {
  const dispatch = useDispatch()
  const path = useLocation().pathname.split("/")
  const route = path[1]
  const routeType = path[2]

  useEffect(() => {
    dispatch(reset())
  }, [dispatch, route, routeType])

  return <Outlet />
}

export default ParentRoute
