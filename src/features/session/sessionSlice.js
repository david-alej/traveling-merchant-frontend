import axios from "../../api/axios"

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export const login = createAsyncThunk(
  "session/login",
  async (merchantCredentials, { getState }) => {
    let session = getState().session
    session = { ...session }

    const { merchantName, headers } = session

    if (merchantName && merchantName.length > 0) return session

    const {
      status,
      data: { csrfToken },
    } = await axios.post("/login", merchantCredentials, {
      headers,
    })

    if (status !== 200) return session

    return {
      merchantName: merchantCredentials.username,
      headers: { ["x-csrf-token"]: csrfToken },
    }
  }
)

export const logout = createAsyncThunk(
  "session/logout",
  async (arg, { getState }) => {
    const { headers } = getState().session
    const requestBody = {}

    await axios.post("/logout", requestBody, {
      headers,
      withCredentials: true,
    })
  }
)

export const sessionSlice = createSlice({
  name: "session",
  initialState: {
    merchantName: "",
    headers: {},
    isLoading: false,
    hasError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isLoading = true
      state.hasError = false
    })

    builder.addCase(login.rejected, (state) => {
      state.isLoading = false
      state.hasError = true
    })

    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.headers = payload.headers
      state.merchantName = payload.merchantName
      state.isLoading = false
      state.hasError = false
    })

    builder.addCase(logout.pending, (state) => {
      state.isLoading = true
      state.hasError = false
    })

    builder.addCase(logout.rejected, (state) => {
      state.isLoading = false
      state.hasError = true
    })

    builder.addCase(logout.fulfilled, (state) => {
      state.merchantName = ""
      state.headers = {}
      state.isLoading = false
      state.hasError = false
    })
  },
})

export const selectCurrentMerchant = (state) => state.session.merchantName

export default sessionSlice.reducer
