import { changeValue, selectBodyProperty } from "../bodySlice"
import { getNameValue } from "../../../util/body-utils"
import { reformColumns } from "../../../util/filters-utils"
import { useGetDatumQuery } from "../../../util/query-utils"
import routesColumnDefinitions from "../../../util/routesColumnDefinitions"
import Spinner from "../../../components/Spinner"
import Table from "../../filters/Table"
import Button from "../../../components/Button"

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { LiaSearchSolid } from "react-icons/lia"
import { MdOutlineClear } from "react-icons/md"
import PropTypes from "prop-types"

export default function ObjectInput({ property, value = {}, header }) {
  const dispatch = useDispatch()
  const name = getNameValue(value)
  const object = useSelector(selectBodyProperty(property)) || {}
  const [popupVisisble, setPopupVisible] = useState(false)
  const route = property + "s"
  const columns = routesColumnDefinitions[route]
  const newName = getNameValue(object)

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
          dispatch(
            changeValue({
              property,
              value:
                !object ||
                object.id === row.original.id ||
                value?.id === row.original.id
                  ? undefined
                  : row.original,
            })
          )

          setPopupVisible(false)
        }}
      />
    )
  }

  const handleClear = () =>
    dispatch(changeValue({ property, value: undefined }))

  return (
    <>
      <div className="object-header">
        <Button
          className="visibility-button"
          icon={<LiaSearchSolid />}
          type={"button"}
          onClick={() => setPopupVisible(true)}
        ></Button>
        {newName && (
          <Button
            onClick={handleClear}
            type="button"
            className="object-clear-button"
            icon={<MdOutlineClear />}
          />
        )}
        <input
          className="object"
          placeholder={name || "Reference"}
          value={newName}
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
          {content}
        </div>
      )}
    </>
  )
}

ObjectInput.propTypes = {
  property: PropTypes.string.isRequired,
  value: PropTypes.any,
  header: PropTypes.string.isRequired,
}
