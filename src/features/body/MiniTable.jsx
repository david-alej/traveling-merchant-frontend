import {
  removeElement,
  editObjectElement,
  selectBodyProperty,
} from "./bodySlice.js"
import {
  getMiniTableInformation,
  getNameValue,
} from "../../util/body-utils.jsx"
import Table from "../filters/Table.jsx"
import ArrayInput from "./input/ArrayInput.jsx"
import Arrow from "../../components/Arrow.jsx"
import Button from "../../components/Button.jsx"

import PropTypes from "prop-types"
import { useState } from "react"
import { useLocation } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { FaDeleteLeft } from "react-icons/fa6"

function Value({ columns, route, value, canInput }) {
  const dispatch = useDispatch()
  const array = useSelector(selectBodyProperty(route)) || []
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  })
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
        onDoubleClick={
          !route.toLowerCase().includes("wares") ? false : () => {}
        }
      />
      {canInput && (
        <>
          <strong>Input</strong>
          <Table
            route={route}
            columns={columns}
            data={array}
            setData={(element) =>
              dispatch(editObjectElement({ property: route, element }))
            }
            onDoubleClick={() => {}}
            editableColumns={
              route === "ordersWares"
                ? ["unitPrice", "amount", "returned"]
                : ["amount", "returned"]
            }
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
                      property: route,
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
  route: PropTypes.string.isRequired,
  value: PropTypes.array,
  canInput: PropTypes.bool.isRequired,
}

export default function MiniTable({ value, header, excludedId }) {
  const nameValue = getNameValue(value)
  const { route, columns } = getMiniTableInformation(header, excludedId)

  const action = useLocation().pathname.split("/").at(-1)
  const isProperAction = action === "edit" || action === "create"
  const isProperHeader = header === "Wares Sold" || header === "Wares Bought"
  const canInput = isProperAction && isProperHeader

  const [isOpen, setIsOpen] = useState(false)

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
      {isOpen && (
        <Value
          columns={columns}
          route={route}
          value={value}
          canInput={canInput}
        />
      )}
    </div>
  )
}

MiniTable.propTypes = {
  value: PropTypes.array.isRequired,
  header: PropTypes.string.isRequired,
  excludedId: PropTypes.string.isRequired,
}
