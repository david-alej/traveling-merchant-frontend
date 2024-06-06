import { useUpdateDataQuery } from "../../util/query-utils.jsx"
import { checkForErrors } from "../../util/body-utils.jsx"
import { selectBody } from "./bodySlice.js"
import Spinner from "../../components/Spinner.jsx"
import Button from "../../components/Button.jsx"
import View from "./View.jsx"

import { useParams, useLocation } from "react-router-dom"
import { useSelector } from "react-redux"

export default function Edit() {
  const { id } = useParams()
  const route = useLocation().pathname.split("/")[1]

  const { errors, ...body } = useSelector(selectBody)

  const [
    updateData,
    {
      data: updatedData,
      error,
      isSuccess: isUpdated,
      isLoading: isUpdating,
      isError: isUpdatedError,
    },
  ] = useUpdateDataQuery(route)

  let content

  if (isUpdating) {
    content = <Spinner />
  } else if (isUpdatedError) {
    content = (
      <div>
        <div>Update Error</div>
        {Object.keys(error).map((key, index) => (
          <p key={index}>{`${key}: ${error[key]}`}</p>
        ))}
      </div>
    )
  } else if (isUpdated) {
    content = (
      <>
        <p>Success</p>
        <div>
          {Object.keys(updatedData).map((key, index) => (
            <p key={index}>{`${key}: ${updatedData[key]}`}</p>
          ))}
        </div>
      </>
    )
  } else {
    content = <View />
  }

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault()

        try {
          await updateData({ id, ...body })
        } catch (err) {
          console.log(err)
        }
      }}
    >
      {content}
      <div className="submit-edit">
        <Button
          type="submit"
          className="submit-button"
          text="Submit"
          disabled={checkForErrors(errors, body)}
        />
      </div>
    </form>
  )
}
