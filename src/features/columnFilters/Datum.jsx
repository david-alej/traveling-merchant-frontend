import Spinner from "../../components/Spinner.jsx"
import { useGetDatumQuery } from "../../util/data-utils.jsx"
import {
  formatPhoneNumber,
  formatSimpleDate,
  formatTagsColumn,
} from "../../util/formatters.js"
import Filters from "./filters/Filters.jsx"
import routesColumnDefinitions from "./routesColumnDefinitions.js"
import "./Datum.css"

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { useState } from "react"
import { FaEdit } from "react-icons/fa"
import { FaDeleteLeft } from "react-icons/fa6"
import { Link, useLocation } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectRouteColumnFilters } from "./columnFiltersSlice.js"

const reformColumn = (column) => {
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
          console.log(column.accessorKey, route, id)
          return id ? <Link to={`/${route}/${id}`}>{id}</Link> : <p>{id}</p>
        }
      }
    }
  }
}

const reformColumns = (columns) =>
  columns.forEach((column) => reformColumn(column))

export default function Datum() {
  const route = useLocation().pathname.split("/")[1]
  const columns = routesColumnDefinitions[route]
  const columnFilters = useSelector(selectRouteColumnFilters(route))
  const [filtersIsOpened, setFiltersIsOpened] = useState(false)

  const { data, error, isFetching, isSuccess, isError } =
    useGetDatumQuery(route)

  reformColumns(columns)

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
    },
    sortingFns: {
      dateSorting: (rowA, rowB, columnId) => {
        const dateA = rowA.getValue(columnId)
        const dateB = rowB.getValue(columnId)

        return dateA < dateB ? 1 : dateA > dateB ? -1 : 0
      },
    },
    filterFns: {
      typeFilter: (row, columnId, filterValue) => {
        const type = row.getValue(columnId)

        if (filterValue.length === 0) {
          return true
        } else {
          return type === filterValue
        }
      },
      tagsFilter: (row, columnId, filterValue) => {
        const tagArray = row.getValue(columnId)

        if (filterValue.length === 0) {
          return true
        } else {
          return filterValue.every((value) => tagArray.includes(value))
        }
      },
      dateFilter: (row, columnId, filterValue) => {
        const date = new Date(row.getValue(columnId))
        const minDateStr = filterValue[0]
        const maxDateStr = filterValue[1]

        if (filterValue.every((element) => element === "")) {
          return true
        } else {
          const minDate = new Date(minDateStr)
          const maxDate = new Date(maxDateStr)

          return filterValue.every((dateStr) => dateStr)
            ? minDate <= date && date <= maxDate
            : minDateStr
            ? minDate <= date
            : date <= maxDate
        }
      },
      arrayLengthFilter: (row, columnId, filterValue) => {
        const arrLen = row.getValue(columnId).length
        const [min, max] = filterValue

        if (!min && !max) {
          return true
        } else if (min && max) {
          return min <= arrLen && arrLen <= max
        } else {
          return min ? min <= arrLen : arrLen <= max
        }
      },
      objectNameFilter: (row, columnId, filterValue) => {
        const propertyName = Object.keys(row.getValue(columnId)).find((key) =>
          key.toLowerCase().includes("name")
        )
        const name = row.getValue(columnId)[propertyName]

        return filterValue ? name.toLowerCase().includes(filterValue) : true
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  let content

  if (isFetching) {
    content = <Spinner />
  } else if (isError) {
    content = <div>{error.toString()}</div>
  } else if (isSuccess) {
    content = (
      <>
        <div className="data-header">
          <div className="filters-container">
            <div
              className={"filters-title" + (filtersIsOpened ? " active" : "")}
              onClick={() => setFiltersIsOpened(!filtersIsOpened)}
            >
              <strong>Filter Search</strong>
            </div>
            <div
              className={"filters-box" + (filtersIsOpened ? " is-open" : "")}
            >
              <Filters table={table} />
            </div>
          </div>
        </div>
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    <div className="header-cell">
                      <div className="header-text">
                        {header.column.columnDef.header}
                      </div>
                      {header.column.getCanSort() && (
                        <div
                          className="sorting-buttons"
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          <p
                            className="sorting-button"
                            style={{
                              color:
                                header.column.getIsSorted() === "asc" &&
                                "black",
                            }}
                          >
                            ▲
                          </p>
                          <p
                            className="sorting-button"
                            style={{
                              color:
                                header.column.getIsSorted() === "desc" &&
                                "black",
                            }}
                          >
                            ▼
                          </p>
                        </div>
                      )}
                    </div>
                  </th>
                ))}
                <th key="actions">
                  <div className="header-cell">
                    <div className="header-text">Actions</div>
                  </div>
                </th>
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
                <td key={`${row.id}_actions`}>
                  <div className="actions">
                    <div className="action edit" onClick={() => {}}>
                      <FaEdit size={23} />
                    </div>
                    <div className="action delete">
                      <FaDeleteLeft size={23} />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <br />
        <div className="page-count">
          {`Page ${
            table.getState().pagination.pageIndex + 1
          } of ${table.getPageCount()} (${
            table.getFilteredRowModel().rows.length
          } results)`}
        </div>
        <div className="page-buttons">
          <button
            onClick={() => table.previousPage()}
            className="page-button"
            disabled={!table.getCanPreviousPage()}
          >
            {"<"}
          </button>
          <button
            onClick={() => table.nextPage()}
            className="page-button"
            disabled={!table.getCanNextPage()}
          >
            {">"}
          </button>
        </div>
      </>
    )
  }

  return <>{content}</>
}
