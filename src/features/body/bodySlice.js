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
    changeError: (state, { payload: { property, error } }) => {
      state.error[property] = error
    },
    initializeTags: (state) => {
      state.tags = []
    },
    initializeArray: (state, { payload: property }) => {
      if (!state[property]) state[property] = []
    },
    addElement: (state, { payload: { property, element: elementToAdd } }) => {
      const isUnique =
        typeof elementToAdd === "object"
          ? state[property].every((obj) => obj.id !== elementToAdd.id)
          : !state[property].includes(elementToAdd)

      if (isUnique) state[property] = [...state[property], elementToAdd]
    },
    removeElement: (
      state,
      { payload: { property, element: elementToRemove } }
    ) => {
      if (typeof elementToRemove === "object") {
        state[property] = state[property].filter(
          (obj) => obj.id !== elementToRemove.id
        )
      } else {
        state[property] = state[property].filter(
          (str) => str !== elementToRemove
        )
      }
    },
    editObjectElement: (
      state,
      { payload: { property, element: newElement } }
    ) => {
      const index = state[property].findIndex((el) => el.id === newElement.id)

      if (index !== -1) state[property].splice(index, 1, newElement)
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
  initializeArray,
  addElement,
  removeElement,
  editObjectElement,
  initializeTags,
  addTag,
  removeTag,
} = bodySlice.actions

export const selectBody = (state) => state.body

export const selectBodyProperty = (property) => (state) => state.body[property]

export const selectErrorProperty = (property) => (state) =>
  state.body.error[property]

export default bodySlice.reducer
