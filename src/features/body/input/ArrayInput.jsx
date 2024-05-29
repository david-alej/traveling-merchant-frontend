import {
  addElement,
  changeValue,
  initializeArray,
  selectBodyProperty,
} from "../bodySlice"
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

const initialState = {
  ware: {},
  amount: 0,
  returned: 0,
  unitPrice: 0.01,
}

function PopUpContent({ header }) {
  const dispatch = useDispatch()
  const property = header === "Wares Sold" ? "waresTickets" : "ordersWares"
  const route = "wares"
  const columns = routesColumnDefinitions[route]
  const [selected, setSelected] = useState(initialState)
  const integers = ["unitPrice", "amount", "returned"]

  if (header === "Wares Sold") integers.shift()

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

  return (
    <>
      <br />
      <div className="add-element">
        <div className="element-part ware" key={0}>
          <p>Ware:</p>
          <input
            className="ware-obj"
            placeholder="Ware"
            value={selected.ware.name || ""}
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
        <Button
          type="button"
          className="add-element-button"
          text="Add Element"
          disabled={
            !(
              selected.ware.id &&
              selected.amount &&
              selected.amount >= selected.returned
            )
          }
          onClick={() => {
            const element = { ...selected }

            element.wareId = selected.ware.id
            element.id = selected.ware.id

            dispatch(
              addElement({
                property,
                element,
              })
            )

            setSelected(initialState)
          }}
        />
      </div>
      <br />
      {content}
    </>
  )
}

PopUpContent.propTypes = { header: PropTypes.string.isRequired }

export default function ArrayInput({ value = [], header }) {
  const dispatch = useDispatch()
  const length = value.length
  const property = header === "Wares Sold" ? "waresTickets" : "ordersWares"

  const array = useSelector(selectBodyProperty(property)) || {}
  const [popupVisisble, setPopupVisible] = useState(false)

  const newLength = array.length

  useEffect(() => {
    dispatch(initializeArray(property))
  }, [dispatch, property])

  const handleClear = () => dispatch(changeValue({ property, value: [] }))

  return (
    <>
      <div className="array-header">
        <Button
          className="visibility-button"
          icon={<LiaSearchSolid />}
          type="button"
          onClick={() => setPopupVisible(true)}
        ></Button>
        {newLength !== 0 && (
          <Button
            onClick={handleClear}
            type="button"
            className="array-clear-button"
            icon={<MdOutlineClear />}
          />
        )}
        <input
          className="array"
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
          <PopUpContent header={header} />
        </div>
      )}
    </>
  )
}

ArrayInput.propTypes = {
  value: PropTypes.array,
  header: PropTypes.string.isRequired,
}
