import {
  camelToFlat,
  getNameValue,
  orderProperties,
} from "../../util/data-utils.jsx"
import FormatValue from "./FormatValue.jsx"
import Table from "../columnFilters/Table.jsx"

import PropTypes from "prop-types"
import { useState } from "react"
import { FaAngleDown } from "react-icons/fa"

export default function MiniTable({ index, value, header, excludedId }) {
  const nameValue = getNameValue(value)
  const route = header.toLowerCase()
  const [isOpen, setIsOpen] = useState(false)
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  })

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
    <div key={index} className="mini-table">
      <div className="header">
        <div className="arrow" onClick={() => setIsOpen(!isOpen)}>
          <FaAngleDown size={20} />
        </div>
        <div className="header-text">{header}</div>
        <div className="name-value">{nameValue}</div>
      </div>
      <div className={"value" + (isOpen ? " open" : "")}>
        <Table
          route={route}
          columns={columns}
          data={value}
          state={{ pagination }}
          onPaginationChange={setPagination}
        />
      </div>
    </div>
  )
}

MiniTable.propTypes = {
  index: PropTypes.number.isRequired,
  value: PropTypes.array.isRequired,
  header: PropTypes.string.isRequired,
  excludedId: PropTypes.string.isRequired,
}
