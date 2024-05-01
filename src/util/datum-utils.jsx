import {
  formatSimpleDate,
  formatPhoneNumber,
  formatTagsColumn,
} from "./formatters"

import { Link } from "react-router-dom"

export const reformColumn = (column) => {
  const {
    accessorKey: id,
    meta: { dataType, property },
  } = column

  switch (dataType) {
    case "len": {
      column.filterFn = "arrayLengthFilter"
      column.cell = (props) => props.getValue().length

      break
    }
    case "obj": {
      column.filterFn = "objectNameFilter"
      column.cell = (props) => {
        const { id: objId, [property]: name } = props.getValue()

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

        if (id === "phoneNumber") return formatPhoneNumber(propValue)

        return propValue.length <= 45
          ? props.getValue()
          : props.getValue().slice(0, 40) + "..."
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
      if (
        column.accessorKey === "orderId" ||
        column.accessorKey === "ticketId"
      ) {
        const route = column.accessorKey.slice(0, -2) + "s"

        column.cell = (props) => {
          const id = props.getValue()

          return id ? <Link to={`/${route}/${id}`}>{id}</Link> : <p>{id}</p>
        }
      }
    }
  }
}

export const reformColumns = (columns) => {
  columns.forEach((column) => reformColumn(column))

  if (columns[0].accessorKey !== "id") {
    columns.unshift({
      accessorKey: "id",
      header: "Id",
      meta: { dataType: "int" },
    })
  }
}
