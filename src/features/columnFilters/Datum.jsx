import routesColumnDefinitions from "../../util/routesColumnDefinitions.js"
import { selectRouteColumnFilters } from "./columnFiltersSlice.js"
import { useGetDatumQuery } from "../../util/query-utils.jsx"
import { reformColumns } from "../../util/datum-utils.jsx"
import Button from "../../components/Button.jsx"
import Spinner from "../../components/Spinner.jsx"
import Filters from "./filters/Filters.jsx"
import ActionButton from "../../components/ActionButton.jsx"
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
import { useLocation, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { FaFilter, FaCirclePlus } from "react-icons/fa6"

export default function Datum() {
  const navigate = useNavigate()
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
        <div className="datum-headers">
          <div className="datum-header">
            <Button
              className="title"
              onClick={() => setFiltersIsOpened(!filtersIsOpened)}
              text={<strong>Filter Search</strong>}
              icon={<FaFilter size={23} />}
            />
            {/* <div
              className={"filters-title" + (filtersIsOpened ? " active" : "")}
              onClick={() => setFiltersIsOpened(!filtersIsOpened)}
            >
              <strong>Filter Search</strong>
            </div> */}
            <div
              className={"filters-box" + (filtersIsOpened ? " is-open" : "")}
            >
              <Filters table={table} />
            </div>
          </div>
          {!filtersIsOpened && (
            <div className="datum-header">
              <Button
                className="title"
                onClick={() => navigate(`/${route}/`)}
                text={<strong>Create</strong>}
                icon={<FaCirclePlus size={23} />}
              />
            </div>
          )}
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
              <tr
                key={row.id}
                onDoubleClick={() => navigate(`/${route}/${row.original.id}`)}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
                <td key={`${row.id}_actions`}>
                  <div className="actions">
                    <ActionButton
                      type={"edit"}
                      route={route}
                      id={row.original.id}
                    />
                    <ActionButton
                      type={"delete"}
                      route={route}
                      id={row.original.id}
                    />
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
          <Button
            className="page-button"
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
            text={"<<"}
          />
          <Button
            className="page-button"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            text={"<"}
          />
          <Button
            className="page-button"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            text={">"}
          />
          <Button
            className="page-button"
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
            text={">>"}
          />
        </div>
      </>
    )
  }

  return <>{content}</>
}
