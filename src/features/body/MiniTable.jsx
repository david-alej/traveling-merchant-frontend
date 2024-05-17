import {
  camelToFlat,
  findIndentyInformation,
  orderProperties,
} from "../../util/data-utils.jsx"
import FormatValue from "./FormatValue.jsx"
import Button from "../../components/Button.jsx"

import PropTypes from "prop-types"
import { useState } from "react"
import { FaAngleDown } from "react-icons/fa"
import { FaEdit } from "react-icons/fa"
import { FaDeleteLeft } from "react-icons/fa6"
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"

export default function MiniTable({ index, value, header, excludedId }) {
  const { nameValue } = findIndentyInformation(value)

  const columns = orderProperties(value[0], excludedId).map((columnId) => {
    const columnDef = {
      accessorKey: columnId,
      header: camelToFlat(columnId),
      cell: (props) => (
        <FormatValue
          property={columnId}
          // eslint-disable-next-line react/prop-types
          value={props.getValue()}
          miniTableName={header}
        />
      ),
    }

    if (columnId.slice(-2) === "At") columnDef.sortingFn = "dateSorting"

    return columnDef
  })

  const [isOpen, setIsOpen] = useState(false)
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  })

  const table = useReactTable({
    data: value,
    columns,
    state: { pagination },
    sortingFns: {
      dateSorting: (rowA, rowB, columnId) => {
        const dateA = rowA.getValue(columnId)
        const dateB = rowB.getValue(columnId)

        return dateA < dateB ? 1 : dateA > dateB ? -1 : 0
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
  })

  return (
    <div key={index} className="extended-row">
      <div className="header">
        <div className="arrow" onClick={() => setIsOpen(!isOpen)}>
          <FaAngleDown size={20} />
        </div>
        <div className="header-text">{header}</div>
        <div className="name-value">{nameValue}</div>
      </div>
      <div className={"value table" + (isOpen ? " open" : "")}>
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
                {value.length && (
                  <th key="actions">
                    <div className="header-cell">
                      <div className="header-text">Actions</div>
                    </div>
                  </th>
                )}
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
                    <div className="action edit">
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
      </div>
    </div>
  )
}

MiniTable.propTypes = {
  index: PropTypes.number.isRequired,
  property: PropTypes.string.isRequired,
  value: PropTypes.array.isRequired,
  header: PropTypes.string.isRequired,
  excludedId: PropTypes.string.isRequired,
}
