import { changeValue, selectBodyProperty } from "../bodySlice"
import { getNameValue } from "../../../util/data-utils"
import { reformColumns } from "../../../util/datum-utils"
import { useGetDatumQuery } from "../../../util/query-utils"
import routesColumnDefinitions from "../../../util/routesColumnDefinitions"
import Spinner from "../../../components/Spinner"
import Table from "../../columnFilters/Table"
import Button from "../../../components/Button"

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { LiaSearchSolid } from "react-icons/lia"
import { MdOutlineClear } from "react-icons/md"
import PropTypes from "prop-types"

export default function ForeignInput({ value = {}, header }) {
  const dispatch = useDispatch()
  const nameValue = getNameValue(value)
  const foreign = useSelector(selectBodyProperty(header.toLowerCase())) || {}
  const [popupVisisble, setPopupVisible] = useState(false)
  const foreignRoute = header.toLowerCase() + "s"
  const columns = routesColumnDefinitions[foreignRoute]

  const { data, error, isFetching, isSuccess, isError } =
    useGetDatumQuery(foreignRoute)

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
        route={foreignRoute}
        onDoubleClick={(row) => () => {
          dispatch(
            changeValue({
              property: header.toLowerCase(),
              value: value.id === row.original.id ? {} : row.original,
            })
          )

          setPopupVisible(!popupVisisble)
        }}
      />
    )
  }

  return (
    <>
      <div className="foreign-header">
        <Button
          className="visibility-button"
          icon={<LiaSearchSolid />}
          type={"button"}
          onClick={() => setPopupVisible(true)}
        ></Button>
        <input
          className="foreign"
          placeholder={nameValue || "Foreign"}
          value={getNameValue(foreign)}
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

ForeignInput.propTypes = {
  value: PropTypes.object,
  header: PropTypes.string.isRequired,
}
