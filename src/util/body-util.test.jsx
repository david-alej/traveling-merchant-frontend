import {
  getNameValue,
  getMiniTableColumns,
  getMiniDatumColumns,
  getMetaClass,
  isEditable,
  checkForErrors,
  checkCreateBody,
  formatBody,
} from "./body-util"
import routesColumnDefinitions from "./routesColumnDefinitions"

describe("Body Util", function () {
  describe("getNameValue", function () {
    it("When value input is falsy, Then empty string is returned", function () {
      const value = undefined

      const result = getNameValue(value)

      expect(result).toEqual("")
    })

    it("When value is not an object, Then empty string is returned", function () {
      const value = [1, 2, 3, 4]

      const result = getNameValue(value)

      expect(result).toEqual("")
    })

    it("When value input is an object, Then the value of a property that includes name is returned", function () {
      const elephantNameTrees = "Joshua"
      const value = { elephantNameTrees }

      const result = getNameValue(value)

      expect(result).toEqual(elephantNameTrees)
    })
  })

  describe("getMiniTableColumns", function () {
    const exisitingKeys = Object.keys(routesColumnDefinitions)

    it("When first two inputs are not provided, Then an error is returned", function () {
      const property = "smile"

      try {
        getMiniTableColumns()
      } catch (err) {
        expect(err.message).toEqual(
          "Cannot read properties of undefined (reading 'slice')"
        )
      }

      try {
        getMiniTableColumns(property)
      } catch (err) {
        expect(err.message).toEqual(
          "Cannot read properties of undefined (reading 'slice')"
        )
      }
    })

    it("When property is not a key in routesColumnDefinitions, Then error is returned", function () {
      const property = "not real property"
      const header = "header"

      try {
        getMiniTableColumns(property, header)
      } catch (err) {
        expect(err.message).toEqual(
          "Cannot read properties of undefined (reading 'accessorKey')"
        )
      }
    })

    it("When property is a key in routesColumnsDefinitions, or also referred to as route, Then an array of reformed columns tailored for MiniTable react component is returned", function () {
      const property =
        exisitingKeys[Math.floor(Math.random() * exisitingKeys.length)]
      const header = "header"

      const result = getMiniTableColumns(property, header)

      expect(Array.isArray(result)).toEqual(true)

      for (const column of result) {
        expect(column).toHaveProperty("accessorKey", "header", "meta", "cell")
      }
    })

    it("When property is a key in routesColumnsDefinitions and header has Wares as its first 5 characters, Then an array of reformed columns is returned and extra column ware is returend with the rest of the columns", function () {
      const property =
        exisitingKeys[Math.floor(Math.random() * exisitingKeys.length)]
      const header = "Wares Pack"

      const result = getMiniTableColumns(property, header)

      expect(Array.isArray(result)).toEqual(true)

      expect(result.some(({ accessorKey }) => accessorKey === "ware")).toEqual(
        true
      )
    })

    it("When property is a key in routesColumnsDefinitions and excludeId is equal to one of the columns in the arrays in routesColumnsDefinitons, Then an array of reformed columns is returned and column with the property of excludedId is removed", function () {
      const property = "tickets"
      const header = "Random"
      const excludedId = "client"

      const result = getMiniTableColumns(property, header, excludedId)

      expect(
        routesColumnDefinitions[property].some(
          ({ accessorKey }) => accessorKey === excludedId
        )
      ).toEqual(true)
      expect(
        result.every(({ accessorKey }) => accessorKey !== excludedId)
      ).toEqual(true)
    })

    it("When property is a key in routesColumnsDefinitions and is not waresTickets or ordersWares, Then an array of reformed columns is returned with an extra column in beginning with accessorKey of id", function () {
      const property = "providers"
      const header = "Random"
      const excludedId = "client"

      const result = getMiniTableColumns(property, header, excludedId)

      expect(result[0]).toEqual(
        expect.objectContaining({ accessorKey: "id", header: "Id" })
      )
    })
  })

  describe("getMiniDatumColumns", function () {
    const exisitingKeys = Object.keys(routesColumnDefinitions)

    it("When the one input are not provided, Then an error is returned", function () {
      try {
        getMiniDatumColumns()
      } catch (err) {
        expect(err.message).toEqual(
          "Cannot read properties of undefined (reading '0')"
        )
      }
    })

    it("When property is not a key in routesColumnDefinitions, Then error is returned", function () {
      const property = "not real property"

      try {
        getMiniDatumColumns(property)
      } catch (err) {
        expect(err.message).toEqual(
          "Cannot read properties of undefined (reading '0')"
        )
      }
    })

    it("When property is a key in routesColumnsDefinitions without the s at the end, Then an array of reformed columns tailored for MiniData react component is returned with a id column in the beginning is added", function () {
      const property = exisitingKeys[
        Math.floor(Math.random() * exisitingKeys.length)
      ].slice(0, -1)

      const result = getMiniDatumColumns(property)

      expect(Array.isArray(result)).toEqual(true)

      for (const column of result) {
        expect(column).toHaveProperty("accessorKey", "header", "meta", "cell")
      }
    })
  })

  describe("getMetaClass", function () {
    it("When route is a key in routesColumnsdefinitions and property does not belong to the columns array provided by the value of the respective routesColumnsDefinitions, Then false is returned", function () {
      const route = "transactions"
      const property = "fake property"

      const result = getMetaClass(route, property)

      expect(result).toEqual(false)
    })

    it("When route is a key in routesColumnsDefinitions and property is an actual column in the columns array provided by the value of the respective routesColumnsDefinitions, Then metaClass is returned which is an object that informs on the relationship that properties have with their route", function () {
      const route = "orders"
      const propertyOne = "provider"
      const propertyTwo = "expectedAt"
      const propertyThree = "actualAt"
      const propertyFour = "transactions"

      const resultOne = getMetaClass(route, propertyOne)
      const resultTwo = getMetaClass(route, propertyTwo)
      const resultThree = getMetaClass(route, propertyThree)
      const resultFour = getMetaClass(route, propertyFour)

      expect(resultOne).toEqual(expect.objectContaining({ isForeign: true }))
      expect(resultTwo).toEqual(expect.objectContaining({ isOriginal: true }))
      expect(resultThree).toEqual(expect.objectContaining({ isOptional: true }))
      expect(resultFour).toEqual(expect.objectContaining({ isForeigns: true }))
    })
  })

  describe("isEditable", function () {
    it("When route and property that satisfies getMetaClass's conditions and the properties metaClass is not either isOptional or isOriginal, Then true is returned", function () {
      const route = "tickets"
      const property = "transactions"

      const result = isEditable(route, property)

      expect(result).toEqual(false)
    })
    it("When route and property that satisfies getMetaClass's conditions and the properties metaClass is either isOptional or isOriginal, Then true is returned", function () {
      const route = "tickets"
      const property = "cost"

      const result = isEditable(route, property)

      expect(result).toEqual(true)
    })
  })

  describe("checkForErrors", function () {
    it("When body input is falsy, Then true is returned", function () {
      const body = null

      const result = checkForErrors(body)

      expect(result).toEqual(true)
    })

    it("When body input is truthy and errors is an object with key and value pairs where at lesat one value is truthy, Then true is returned", function () {
      const body = true
      const errors = { dinasour: "hamburger" }

      const result = checkForErrors(body, errors)

      expect(result).toEqual(true)
    })

    it("When body input is truthy and errors is an object with key and value pairs where all the values are false, Then undefined is returned", function () {
      const body = true
      const errors = { dinasour: undefined }

      const result = checkForErrors(body, errors)

      expect(result).toEqual(undefined)
    })
  })

  describe("checkCreateBody", function () {
    it("When input is an object containing properties errors with value of an object, requirements with value of an array, and other key-value pairs where requirements are the miscillanious properties that should be mandatory, Then false is returned", function () {
      const errors = { text: undefined, createdAt: false }
      const requirements = ["text", "createdAt"]
      const body = {
        text: "This client was rude lol",
        createdAt: new Date().toISOString(),
        cost: 45.32,
      }
      const input = { errors, requirements, ...body }

      const result = checkCreateBody(input)

      expect(result).toEqual(false)
    })
  })

  describe("formatBody", function () {
    it("When body input is an object with key value pairs, Then  a formatted body is returned", function () {
      const createdAt = { year: 2026 }
      const text = "Churros"
      const body = {
        client: { id: 2, name: "Tank" },
        text,
        createdAt,
      }

      const result = formatBody(body)

      expect(result).toEqual(
        expect.objectContaining({ clientId: 2, text, createdAt })
      )
    })
  })
})
