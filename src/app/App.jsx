import Login from "../features/session/Login"
import Dashboard from "../components/Dashboard"
import Root from "../components/Root"
import ParentRoute from "../components/ParentRoute"
import Data from "../features/columnFilters/Data"
import Datum from "../features/columnFilters/Datum"
import "./App.css"

import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route path="login" element={<Login />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path=":route" element={<ParentRoute />}>
        <Route index path="" element={<Datum />} />
        <Route path=":id" element={<Data />} />
      </Route>
    </Route>
  )
)

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}
