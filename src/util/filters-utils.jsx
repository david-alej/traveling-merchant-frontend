import {
  formatSimpleDate,
  formatPhoneNumber,
  formatTagsColumn,
} from "./formatters"

import { Link } from "react-router-dom"
import routesColumnDefinitions from "./routesColumnDefinitions"

export const reformColumn = (column, shallow) => {
  const {
    accessorKey: id,
    meta: { dataType, property },
  } = column

  column.cell = (props) => props.getValue()

  switch (dataType) {
    case "len": {
      column.filterFn = "arrayLengthFilter"
      column.cell = (props) => props.getValue().length

      break
    }
    case "obj": {
      column.filterFn = "objectNameFilter"
      column.cell = (props) => {
        const value = props.getValue()

        if (!value) return <p>0</p>
        const { id: objId, [property]: name } = value

        return <Link to={`/${id}s/${objId}`}>{name}</Link>
      }

      break
    }

    case "type": {
      column.filterFn = "typeFilter"

      break
    }

    case "date": {
      column.sortingFn = "dateSorting"
      column.filterFn = "dateFilter"
      column.cell = (props) => <p>{formatSimpleDate(props.getValue())}</p>

      break
    }

    case "str": {
      column.cell = (props) => {
        const propValue = props.getValue()
        const maxLength = shallow && 45

        if (id === "phoneNumber") return formatPhoneNumber(propValue)

        if (!propValue) return propValue

        return maxLength && propValue.length > maxLength
          ? props.getValue().slice(0, maxLength - 5) + "..."
          : props.getValue()
      }

      break
    }

    case "itr": {
      column.cell = (props) => formatTagsColumn(props.getValue())
      column.enableSorting = false
      column.filterFn = "tagsFilter"

      break
    }

    case "int": {
      if (column.accessorKey.toLowerCase().includes("id")) {
        const route = column.accessorKey.slice(0, -2) + "s"

        column.cell = (props) => {
          const id = props.getValue()

          return id ? <Link to={`/${route}/${id}`}>{id}</Link> : <p>{id}</p>
        }
      }
    }
  }
}

export const reformColumns = (columns, shallow = true) => {
  columns.forEach((column) => reformColumn(column, shallow))

  let newColumns = columns

  if (columns[0].accessorKey !== "id") {
    newColumns = [
      {
        accessorKey: "id",
        header: "Id",
        meta: { dataType: "int" },
      },
    ].concat(columns)
  }

  return newColumns
}

export const getPartialColumns = (route) => {
  let columns = routesColumnDefinitions[route]

  return reformColumns(columns)
}
