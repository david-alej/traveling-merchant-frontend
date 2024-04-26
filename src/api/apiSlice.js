import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const tagTypes = [
  "Ticket",
  "Transaction",
  "Client",
  "Work",
  "Ware",
  "Order",
  "Provider",
]

export const rootSplitApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
    tagTypes,
    keepUnusedDataFor: 10,
    prepareHeaders: (headers, { getState }) => {
      const resHeaders = getState().session.headers

      if (JSON.stringify(resHeaders) !== "{}") {
        const [tokenHeader, csrfToken] = Object.entries(resHeaders)[0]

        headers.set(tokenHeader, csrfToken)
      }

      return headers
    },
    credentials: "include",
  }),
  endpoints: () => ({}),
})
