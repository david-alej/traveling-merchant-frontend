import { isReformed, reformColumn } from "./filters-util"

import { render, screen } from "@testing-library/react"
import { createMemoryHistory } from "history"
import { MemoryRouter } from "react-router-dom"
import "@testing-library/jest-dom"

const randomDate = () => {
  const start = new Date(2000)
  const end = new Date()

  const date = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  )

  const formatter = new Intl.DateTimeFormat("en-US", {
    minute: "numeric",
    hour: "numeric",
    hour12: true,
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "US/Central",
    formatMatcher: "basic",
  })

  let [monthAndDay, year, time] = formatter.format(date).split(",")

  year = year.slice(1)
  time = time.slice(1)
  const month = monthAndDay.slice(0, 3)
  const day = monthAndDay.slice(4)

  return {
    dateString: date.toISOString(),
    day,
    month,
    year,
    time,
  }
}

describe("Filters Util", function () {
  describe("reformColumn", function () {
    it("When column input is not an object, Then error is returned", function () {
      const column = " "

      try {
        reformColumn(column)
      } catch (err) {
        expect(err.message).toBe(
          "Cannot read properties of undefined (reading 'dataType')"
        )
      }
    })

    it("When column input is not an object with at least a meta.dataType property, Then the column is reformed generally with adding a property of cell that retreives the a one to one value of data", function () {
      const value = "string"
      const originalColumn = { meta: 5 }
      const column = { ...originalColumn }

      reformColumn(column)

      expect(column.cell({ getValue: () => value })).toBe(value)
    })

    it("When column input is one of the dataTypes of arr, obj, type, date, str, itr, num, and int, where str requires an accessorKey property in column, Then column is reformed with a cell property that is a function that works on data, and possibly a filterFn and sortingFn property", function () {
      const dataTypes = [
        "arr",
        "obj",
        "type",
        "date",
        "str",
        "itr",
        "num",
        "int",
      ]

      for (const dataType of dataTypes) {
        const column = { accessorKey: "columnOne", meta: { dataType } }

        reformColumn(column)

        expect(typeof column.cell).toBe("function")
      }
    })

    it("When column input has a dataType of arr, Then column now has property filerFn with value of arrayLengthFilter and cell that gets the array length", function () {
      const column = { meta: { dataType: "arr" } }
      const length = Math.ceil(Math.random() * 20)

      reformColumn(column)

      expect(column.filterFn).toBe("arrayLengthFilter")
      expect(
        column.cell({ getValue: () => Array.from({ length }, () => 0) })
      ).toBe(length)
    })

    it("When column input has a dataType of obj, Then column now has property filerFn with value of objectNameFilter and cell that makes a react component that links to specific data", async function () {
      const history = createMemoryHistory({ initialEntries: ["/tickets"] })
      const id = 5
      const name = "daniel"
      const column = {
        accessorKey: "client",
        meta: { dataType: "obj", property: "name" },
      }

      reformColumn(column)
      render(
        <MemoryRouter history={history}>
          {column.cell({ getValue: () => ({ id, name }) })}
        </MemoryRouter>
      )

      expect(column.filterFn).toBe("objectNameFilter")
      expect(history.location.pathname).toBe("/tickets")
      expect(screen.getByText(name)).toBeInTheDocument()
      expect(screen.getByText(name)).toHaveAttribute(
        "href",
        `/${column.accessorKey}s/` + id
      )
    })

    it("When column input has a dataType of type, Then column now has property of filterFn with value of typeFilter", async function () {
      const column = { accessorKey: "type", meta: { dataType: "type" } }

      reformColumn(column)

      expect(column.filterFn).toBe("typeFilter")
    })

    it("When column input has a dataType of date, Then column now has properties of filterFn, sortingFn, and cell with values of dateFilter, dateSorting, and a formatted function for dates that has a short version or long version, respectively", async function () {
      const { day, month, year, time, dateString } = randomDate()
      const shortColumn = {
        accessorKey: "createdAt",
        meta: { dataType: "date" },
      }
      const longColumn = {
        accessorKey: "createdAt",
        meta: { dataType: "date" },
      }

      reformColumn(shortColumn, true)
      reformColumn(longColumn, false)

      expect(shortColumn.filterFn).toBe("dateFilter")
      expect(longColumn.filterFn).toBe("dateFilter")
      expect(shortColumn.sortingFn).toBe("dateSorting")
      expect(longColumn.sortingFn).toBe("dateSorting")
      expect(shortColumn.cell({ getValue: () => dateString })).toBe(
        `${month} ${day}, ${year}`
      )
      expect(longColumn.cell({ getValue: () => dateString })).toBe(
        `${month} ${day}, ${year}, ${time}`
      )
    })

    it("When column input has a dataType of str, Then column now has a cell property with value of a function that returns a full or short version of the data", function () {
      const str = "12345678901234567890123456789012345678901234567890"
      const shortColumn = { accessorKey: "text", meta: { dataType: "str" } }
      const longColumn = { accessorKey: "text", meta: { dataType: "str" } }

      reformColumn(shortColumn, true)
      reformColumn(longColumn, false)

      expect(shortColumn.cell({ getValue: () => str })).toBe(
        str.slice(0, 40) + "..."
      )
      expect(longColumn.cell({ getValue: () => str })).toBe(str)
    })

    it("When column input has a dataType of itr, Then column now has properties fitlerFn, sortingFn, and cell with values of tagsFilter, false, and a format function for an array of strings that has a short or long version", function () {
      const tags = ["tag1", "tag2", "tag3", "tag4"]
      const shortColumn = { accessorKey: "tags", meta: { dataType: "itr" } }
      const longColumn = { accessorKey: "tags", meta: { dataType: "itr" } }

      reformColumn(shortColumn, true)
      reformColumn(longColumn, false)

      expect(shortColumn.cell({ getValue: () => tags })).toBe(
        tags.slice(0, 3).join(", ") + ", ..."
      )
      expect(longColumn.cell({ getValue: () => tags })).toBe(tags.join(", "))
    })

    it("When column input has a dataType of num, Then column now has properties fitlerFn and cell with values of rangeFilter and a format function to make a number to a string with a money symbol next to it", function () {
      const num = 20.53
      const column = { accessorKey: "payment", meta: { dataType: "num" } }

      reformColumn(column)

      expect(column.filterFn).toBe("rangeFilter")
      expect(column.cell({ getValue: () => num })).toBe(`$${num}`)
    })

    it("When column input has a dataType of int, Then column now has properties fitlerFn with a value of rangeFilter, and a conditional filterFn if accessorKey includes id where a link is given to the specific data page", function () {
      const int = 20
      const column = { accessorKey: "payment", meta: { dataType: "int" } }
      const conditionalColumn = {
        accessorKey: "ticketId",
        meta: { dataType: "int" },
      }

      reformColumn(column)
      reformColumn(conditionalColumn)

      expect(column.filterFn).toBe("rangeFilter")
      expect(conditionalColumn.filterFn).toBe("rangeFilter")
      expect(column.cell({ getValue: () => int })).toBe(int)

      render(
        <MemoryRouter history={history}>
          {conditionalColumn.cell({ getValue: () => int })}
        </MemoryRouter>
      )

      expect(screen.getByText(int)).toBeInTheDocument()
      expect(screen.getByText(int)).toHaveAttribute(
        "href",
        `/${conditionalColumn.accessorKey.slice(0, -2)}s/` + 20
      )
    })
  })

  describe("isReformed", function () {
    it("When an array of columns is input and the last column does not have a cell .property, Then false is returned", function () {
      const columns = [
        {
          accessorKey: "id",
          meta: { dataType: "int" },
        },
        { accessorKey: "clientId", meta: { dataType: "int" } },
        {
          accessorKey: "text",
          meta: { dataType: "str" },
        },
      ]

      const result = isReformed(columns)

      expect(result).toBe(false)
    })

    it("When an array of columns is input and the last column has a cell .property, Then true is returned", function () {
      const columns = [
        {
          accessorKey: "id",
          meta: { dataType: "int" },
        },
        { accessorKey: "clientId", meta: { dataType: "int" } },
        {
          accessorKey: "text",
          meta: { dataType: "str" },
          cell: (props) => props.getValue(),
        },
      ]

      const result = isReformed(columns)

      expect(result).toBe(true)
    })
  })
})
