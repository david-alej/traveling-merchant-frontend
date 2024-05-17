import { createSlice } from "@reduxjs/toolkit"

const initialState = { error: {} }

export const bodySlice = createSlice({
  name: "body",
  initialState,
  reducers: {
    reset: () => initialState,
    changeValue: (state, { payload: { property, value } }) => {
      state[property] = value
    },
    changeError: (state, { payload: { property, value } }) => {
      state.error[property] = value
    },
    initializeTags: (state) => {
      state.tags = []
    },
    addTag: (state, { payload: tag }) => {
      state.tags = [...state.tags, tag]
    },
    removeTag: (state, { payload: tagToRemove }) => {
      state.tags = state.tags.filter((tag) => tag !== tagToRemove)
    },
  },
})

export const {
  reset,
  changeValue,
  changeError,
  initializeTags,
  addTag,
  removeTag,
} = bodySlice.actions

export const selectBody = (state) => state.body

export const selectBodyProperty = (property) => (state) => state.body[property]

export const selectErrorProperty = (property) => (state) =>
  state.body.error[property]

export default bodySlice.reducer
