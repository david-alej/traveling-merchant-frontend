import { changeValue, initializeArray, selectBodyProperty } from "../bodySlice"
import routesColumnDefinitions from "../../../util/routesColumnDefinitions"
import { useGetDatumQuery } from "../../../util/query-utils"
import { reformColumns } from "../../../util/datum-utils"
import Button from "../../../components/Button"
import Spinner from "../../../components/Spinner"
import Table from "../../columnFilters/Table"

import PropTypes from "prop-types"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { MdOutlineClear } from "react-icons/md"
import { LiaSearchSolid } from "react-icons/lia"
import IntegerInput from "./IntegerInput"

export default function ArrayInput({ value = [], header }) {
  const dispatch = useDispatch()
  const length = value.length
  const property = header === "Wares Sold" ? "waresTickets" : "ordersWares"
  const route = "wares"
  const array = useSelector(selectBodyProperty(property)) || {}
  const [popupVisisble, setPopupVisible] = useState(false)
  const [selected, setSelected] = useState({
    ware: {},
    amount: undefined,
    returned: undefined,
    unitPrice: undefined,
  })
  const columns = routesColumnDefinitions[route]
  const newLength = array.length
  const integers = ["amount", "returned", "unitPrice"]

  if (header === "Wares Sold") integers.pop()

  useEffect(() => {
    dispatch(initializeArray(property))
  }, [dispatch, property])

  const { data, error, isFetching, isSuccess, isError } =
    useGetDatumQuery(route)

  reformColumns(columns)

  let content

  if (isFetching) {
    content = <Spinner />
  } else if (isError) {
    content = <div>{error.toString()}</div>
  } else if (isSuccess) {
    content = (
      <Table
        columns={columns}
        data={data}
        route={route}
        onDoubleClick={(row) => () => {
          setSelected((prev) => ({ ...prev, ware: row.original }))
        }}
      />
    )
  }

  const handleClear = () => dispatch(changeValue({ property, value: [] }))

  return (
    <>
      <div className="array-header">
        <Button
          className="visibility-button"
          icon={<LiaSearchSolid />}
          type={"button"}
          onClick={() => setPopupVisible(true)}
        ></Button>
        {newLength !== 0 && (
          <Button
            onClick={handleClear}
            type="button"
            className="object-clear-button"
            icon={<MdOutlineClear />}
          />
        )}
        <input
          className="object"
          placeholder={length !== 0 ? length : "List"}
          value={newLength !== 0 ? newLength : ""}
          readOnly
        />
      </div>
      {popupVisisble && (
        <div className="pop-up">
          <div className="pop-up-header">
            <strong>{header}</strong>
            <Button
              className="no-visibility-button"
              icon={<MdOutlineClear />}
              type="button"
              onClick={() => setPopupVisible(!popupVisisble)}
            />
          </div>
          <div className="add-element">
            <div className="element-part ware" key={0}>
              <p>ware</p>
              <input
                className="ware-obj"
                placeholder="Ware"
                value={selected.ware.name}
                readOnly
              />
            </div>
            {integers.map((input, index) => (
              <IntegerInput
                key={index + 1}
                property={input}
                selected={selected}
                setSelected={setSelected}
              />
            ))}
          </div>
          {content}
        </div>
      )}
    </>
  )
}

ArrayInput.propTypes = {
  value: PropTypes.array,
  header: PropTypes.string.isRequired,
}
