import { useDeleteDataQuery } from "../../util/query-utils.jsx"
import { selectBody } from "./bodySlice.js"
import Spinner from "../../components/Spinner.jsx"
import Row from "./Row.jsx"

import { useLocation } from "react-router-dom"
import { useSelector } from "react-redux"
import PropTypes from "prop-types"
import Button from "../../components/Button.jsx"
import { MdOutlineClear } from "react-icons/md"

export default function Delete({ columns, data, closePopUp }) {
  const route = useLocation().pathname.split("/")[1]
  // eslint-disable-next-line no-unused-vars
  const { errors, requirements, ...body } = useSelector(selectBody)

  const [deleteData, { error: response, isLoading: isDeleting, isError }] =
    useDeleteDataQuery(route)

  let content

  if (isDeleting) {
    content = <Spinner />
  } else if (isError) {
    content =
      response.originalStatus < 300 ? (
        <>
          <p>Success</p>
          <div>{response.data}</div>
        </>
      ) : (
        <div>
          <div>Update Error</div>
          {Object.keys(response).map((key, index) => (
            <p key={index}>{`${key}: ${response[key]}`}</p>
          ))}
        </div>
      )
  } else {
    content = (
      <div className="delete">
        <div className="delete-header">
          Are you sure you want to <strong>delete</strong> the following{" "}
          <strong>{route.slice(0, -1)}</strong>?
        </div>
        <div className="data" key={`${route}-${data.id}`}>
          {columns.map(({ accessorKey: property, header, cell }, index) => (
            <Row
              key={index}
              property={property}
              value={cell({ getValue: () => data[property] })}
              header={header}
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    // <div className="pop-up">
    <form
      className="pop-up"
      onSubmit={async (e) => {
        e.preventDefault()
        console.log(data.id)
        try {
          await deleteData(data.id)
        } catch (err) {
          console.log(err)
        }

        closePopUp()
      }}
    >
      <div className="pop-up-header">
        <strong>Delete</strong>
        <Button
          className="no-visibility-button"
          icon={<MdOutlineClear />}
          type="button"
          onClick={closePopUp}
        />
      </div>
      <br />
      {content}
      <br />
      <div className="delete-boolean-buttons">
        <Button className="delete-boolean-button" text="Yes" />
        <Button
          className="delete-boolean-button"
          type="button"
          text="No"
          onClick={closePopUp}
        />
      </div>
      <br />
    </form>
    // </div>
  )
}

Delete.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.object.isRequired,
  closePopUp: PropTypes.func,
}
