import sessionReducer from "../features/session/sessionSlice.js"
import columnFiltersReducer from "../features/columnFilters/columnFiltersSlice.js"
import { rootSplitApi } from "../api/apiSlice.js"

import { configureStore } from "@reduxjs/toolkit"

export default (preloadedState) =>
  configureStore({
    preloadedState,
    reducer: {
      session: sessionReducer,
      [rootSplitApi.reducerPath]: rootSplitApi.reducer,
      columnFilters: columnFiltersReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(rootSplitApi.middleware),
  })
