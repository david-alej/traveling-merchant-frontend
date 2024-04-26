import { createSlice } from "@reduxjs/toolkit"
import routesColumnsDefinitions from "./routesColumnDefinitions"

const createInitialState = () => {
  const initialState = {}

  for (const route in routesColumnsDefinitions) {
    const routeColDefs = routesColumnsDefinitions[route]

    initialState[route] = routeColDefs.map((def) => {
      const {
        accessorKey: id,
        meta: { dataType },
      } = def
      let value = ["", ""]

      if (dataType === "itr") {
        value = []
      } else if (
        dataType === "str" ||
        dataType === "type" ||
        dataType === "obj"
      ) {
        value = ""
      }

      return { id, value }
    })
  }

  return initialState
}

export const columnFiltersSlice = createSlice({
  name: "columnFilters",
  initialState: createInitialState(),
  reducers: {
    changeValue: (state, { payload: { route, id, value } }) => {
      const routeColumnFilters = state[route]
      routeColumnFilters.forEach((f) => {
        if (f.id === id) f.value = value

        return f
      })
    },
    addValue: (state, { payload: { route, id, value } }) => {
      const routeColumnFilters = state[route]
      routeColumnFilters.forEach((f) => {
        if (f.id === id && !f.value.includes(value)) {
          f.value.push(value)
        }

        return f
      })
    },
    removeValue: (state, { payload: { route, id, value } }) => {
      const routeColumnFilters = state[route]
      routeColumnFilters.forEach((f) => {
        if (f.id === id && f.value.includes(value)) {
          const indexToRemove = f.value.indexOf(value)

          if (indexToRemove > -1) f.value.splice(indexToRemove, 1)
        }

        return f
      })
    },
    changeExtremaValue: (
      state,
      { payload: { route, id, value, extremaType } }
    ) => {
      const routeColumnFilters = state[route]
      const extremaIdx = extremaType === "min" ? 0 : 1

      routeColumnFilters.forEach((f) => {
        if (f.id === id) f.value[extremaIdx] = value

        return f
      })
    },
  },
})

export const { changeValue, addValue, removeValue, changeExtremaValue } =
  columnFiltersSlice.actions

export const selectAllColumnFilters = (state) => state.columnFilters

export const selectRouteColumnFilters = (route) => (state) =>
  state.columnFilters[route]

export default columnFiltersSlice.reducer
