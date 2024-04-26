// import routeApis from "../api/routeApis"
// import { tagTypes } from "../api/apiSlice"

// const loadData = (tagType) => {
//   return routeApis[`${tagType.toLowerCase()}Api`][`useGet${tagType}sQuery`]()
// }

export default function Dashboard() {
  // for (const tagType of tagTypes) loadData(tagType)

  return <h1 className="dashboard">Dashboard</h1>
}
