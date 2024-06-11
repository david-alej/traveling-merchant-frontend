import {
  addElement,
  changeValue,
  initializeArray,
  selectBodyProperty,
} from "../bodySlice"
import routesColumnDefinitions from "../../../util/routesColumnDefinitions"
import { useGetDatumQuery } from "../../../util/query-utils"
import { reformColumns } from "../../../util/filters-utils"
import Button from "../../../components/Button"
import Spinner from "../../../components/Spinner"
import Table from "../../filters/Table"

import PropTypes from "prop-types"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { MdOutlineClear } from "react-icons/md"
import { LiaSearchSolid } from "react-icons/lia"

const initialState = {
  ware: {},
  amount: 0,
  returned: 0,
  unitPrice: 0,
}

function PopUpContent({ header, excludedId, arrayOn }) {
  const dispatch = useDispatch()
  const property = header === "Wares Sold" ? "waresTickets" : "ordersWares"
  const route = "wares"
  let columns = routesColumnDefinitions[route].filter(
    (col) => col.accessorKey !== excludedId
  )

  const [selected, setSelected] = useState(initialState)
  const integers = ["amount", "returned"]

  const { data, error, isFetching, isSuccess, isError } =
    useGetDatumQuery(route)

  columns = reformColumns(columns)

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
        {header === "Wares Bought" && (
          <div className="element-part float" key={1}>
            <p>Unit Price:</p>
            <input
              placeholder="Positive"
              value={selected.unitPrice}
              onChange={({ target }) =>
                setSelected((prev) => ({ ...prev, unitPrice: target.value }))
              }
            />
          </div>
        )}
        {integers.map((integer, index) => (
          <div className="element-part integer" key={index + 2}>
            <p>{integer}:</p>
            <input
              placeholder="integer"
              value={selected[integer]}
              onChange={({ target }) =>
                setSelected((prev) => ({ ...prev, [integer]: target.value }))
              }
            />
          </div>
        ))}
        <Button
          type="button"
          className="add-element-button"
          text="Add Element"
          disabled={
            !(
              selected.ware.id &&
              (!selected.unitPrice || selected.unitPrice > 0) &&
              selected.amount &&
              selected.amount >= selected.returned &&
              arrayOn
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

PopUpContent.propTypes = {
  header: PropTypes.string.isRequired,
  excludedId: PropTypes.string,
  arrayOn: PropTypes.bool,
}

export default function ArrayInput({
  property,
  value = [],
  header,
  excludedId,
}) {
  const dispatch = useDispatch()
  const length = typeof value === "object" ? value.length : 0

  const array = useSelector(selectBodyProperty(property)) || []
  const [popupVisisble, setPopupVisible] = useState(false)
  const [arrayOn, setArrayOn] = useState(false)

  const newLength = array.length

  useEffect(() => {
    if (array.length === 0 && arrayOn) {
      dispatch(initializeArray(property))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [property])

  const handleClear = () =>
    dispatch(changeValue({ property, value: undefined }))

  return (
    <div className="input-switch">
      <Button
        type="button"
        className="input-switch-button"
        onClick={() => {
          handleClear()
          setArrayOn(!arrayOn)
        }}
        text={arrayOn ? "On" : "Off"}
      />
      <div className={"array-header" + (!arrayOn ? " disabled" : "")}>
        <Button
          className="visibility-button"
          icon={<LiaSearchSolid />}
          type="button"
          onClick={() => setPopupVisible(true)}
          disabled={!arrayOn}
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
          <PopUpContent
            header={header}
            excludedId={excludedId}
            arrayOn={arrayOn}
          />
        </div>
      )}
    </div>
  )
}

ArrayInput.propTypes = {
  property: PropTypes.string.isRequired,
  value: PropTypes.any,
  header: PropTypes.string.isRequired,
  excludedId: PropTypes.string,
}
