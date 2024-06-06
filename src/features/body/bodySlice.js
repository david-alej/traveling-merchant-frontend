import { createSlice } from "@reduxjs/toolkit"

const initialState = { errors: {}, requirments: [] }

export const bodySlice = createSlice({
  name: "body",
  initialState,
  reducers: {
    reset: () => initialState,
    changeValue: (state, { payload: { property, value } }) => {
      state[property] = value
    },
    changeError: (state, { payload: { property, error } }) => {
      state.errors[property] = error
    },
    addRequirment: (state, { payload: property }) => {
      if (!state.requirments.includes(property)) {
        state.requirments = [...state.requirments, property]
      }
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
  addRequirment,
} = bodySlice.actions

export const selectBody = (state) => state.body

export const selectBodyProperty = (property) => (state) => state.body[property]

export const selectErrorProperty = (property) => (state) =>
  state.body.errors[property]

export default bodySlice.reducer
