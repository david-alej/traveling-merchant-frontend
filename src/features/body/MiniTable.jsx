import { removeElement, selectBodyProperty } from "./bodySlice.js"
import {
  camelToFlat,
  getNameValue,
  orderProperties,
} from "../../util/data-utils.jsx"
import FormatValue from "./FormatValue.jsx"
import Table from "../columnFilters/Table.jsx"
import ArrayInput from "./input/ArrayInput.jsx"
import Arrow from "../../components/Arrow.jsx"
import Button from "../../components/Button.jsx"

import PropTypes from "prop-types"
import { useState } from "react"
import { useLocation } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { FaDeleteLeft } from "react-icons/fa6"

function Value({ columns, header, value }) {
  const dispatch = useDispatch()
  const route = header.toLowerCase()
  const arrayProperty = header === "Wares Sold" ? "waresTickets" : "ordersWares"
  const path = useLocation().pathname.split("/").at(-1)
  const isProperAction = path === "edit" || path === "create"
  const isProperHeader = header === "Wares Sold" || header === "Wares Bought"
  const canInput = isProperAction && isProperHeader

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  })
  const array = useSelector(selectBodyProperty(arrayProperty)) || []
  const [arrayPagination, setArrayPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  })

  return (
    <div className="value">
      <strong>Value</strong>
      <Table
        route={route}
        columns={columns}
        data={value}
        state={{ pagination }}
        onPaginationChange={setPagination}
      />
      {canInput && (
        <>
          <strong>Input</strong>
          <Table
            route={route}
            columns={columns.slice(0, -2)}
            data={array}
            state={{ pagination: arrayPagination }}
            onPaginationChange={setArrayPagination}
            customAction={(row) => (
              <Button
                type="button"
                className="delete-element-button"
                icon={<FaDeleteLeft />}
                onClick={() =>
                  dispatch(
                    removeElement({
                      property: arrayProperty,
                      element: { id: row.original.id },
                    })
                  )
                }
              />
            )}
          />
        </>
      )}
    </div>
  )
}

Value.propTypes = {
  columns: PropTypes.array.isRequired,
  header: PropTypes.string.isRequired,
  value: PropTypes.array,
}

export default function MiniTable({ value, header, excludedId }) {
  const nameValue = getNameValue(value)
  const path = useLocation().pathname.split("/").at(-1)
  const isProperAction = path === "edit" || path === "create"
  const isProperHeader = header === "Wares Sold" || header === "Wares Bought"
  const canInput = isProperAction && isProperHeader

  const [isOpen, setIsOpen] = useState(false)

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

  return (
    <div className="mini-table">
      <div className="header">
        <Arrow onClick={() => setIsOpen(!isOpen)} />
        <div className="header-text">{header}</div>
        <div className="name-value">{nameValue}</div>
        {canInput && (
          <div className="input">
            <ArrayInput value={value} header={header} />
          </div>
        )}
      </div>
      {isOpen && <Value columns={columns} header={header} value={value} />}
    </div>
  )
}

MiniTable.propTypes = {
  value: PropTypes.array.isRequired,
  header: PropTypes.string.isRequired,
  excludedId: PropTypes.string.isRequired,
}
