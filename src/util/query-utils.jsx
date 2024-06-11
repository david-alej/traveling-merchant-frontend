import routeApis from "../api/routeApis"

export const getRouteApi = (route) => {
  return routeApis[route.toLowerCase().slice(0, -1) + "Api"]
}

export const useGetDatumQuery = (route) => {
  const routeApi = getRouteApi(route)

  return routeApi[`useGet${route[0].toUpperCase() + route.slice(1)}Query`](
    {},
    { refetchOnMountOrArgChange: true }
  )
}

export const useGetDataQuery = (route, id) => {
  const routeApi = getRouteApi(route)

  return routeApi[`useGet${route[0].toUpperCase() + route.slice(1, -1)}Query`](
    id,
    { refetchOnMountOrArgChange: true }
  )
}

export const useUpdateDataQuery = (route) => {
  const routeApi = getRouteApi(route)

  return routeApi[
    `useUpdate${route[0].toUpperCase() + route.slice(1, -1)}Mutation`
  ]()
}

export const useCreateDataQuery = (route) => {
  const routeApi = getRouteApi(route)

  return routeApi[
    `useCreate${route[0].toUpperCase() + route.slice(1, -1)}Mutation`
  ]()
}
