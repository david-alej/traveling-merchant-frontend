import Login from "../features/session/Login"
import Dashboard from "../components/Dashboard"
import Root from "../components/root/Root"
import ParentRoute from "../components/ParentRoute"
import Data from "../components/data/Data"
import Datum from "../features/columnFilters/Datum"
import View from "../components/data/View"
import Edit from "../components/data/Edit"
import Delete from "../components/data/Delete"
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
        <Route path=":id" element={<Data />}>
          <Route index path="" element={<View />} />
          <Route path="edit" element={<Edit />} />
          <Route path="delete" element={<Delete />} />
        </Route>
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
