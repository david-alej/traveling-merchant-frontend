import { providesList } from "./api-util"

describe("Api Util", function () {
  describe("providesList", function () {
    it("When resultsWithIds input is an array of objects with an id property with integer values and tagType is a string, Then an array of objects with properties of type and id with values of tagType and id of an element id in resultsWithIds", function () {
      const resultsWithIds = Array.from({ length: 5 }, (v, i) => ({
        id: i + 1,
      }))
      const tagType = "Wares"

      const result = providesList(resultsWithIds, tagType)

      expect(result).toEqual([
        { id: "LIST", type: "Wares" },
        { id: 1, type: "Wares" },
        { id: 2, type: "Wares" },
        { id: 3, type: "Wares" },
        { id: 4, type: "Wares" },
        { id: 5, type: "Wares" },
      ])
    })

    it("When resultsWithIds input is falsy and tagType is a string, Then an array with one object element with id of LIST and type of tagType", function () {
      const resultsWithIds = undefined
      const tagType = "Wares"

      const result = providesList(resultsWithIds, tagType)

      expect(result).toEqual([{ id: "LIST", type: "Wares" }])
    })
  })
})
