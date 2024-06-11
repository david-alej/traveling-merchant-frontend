import { useUpdateDataQuery } from "../../util/query-utils.jsx"
import { checkForErrors, formatBody } from "../../util/body-utils.jsx"
import { selectBody } from "./bodySlice.js"
import Spinner from "../../components/Spinner.jsx"
import Button from "../../components/Button.jsx"
import View from "./View.jsx"

import { useParams, useLocation } from "react-router-dom"
import { useSelector } from "react-redux"

export default function Edit() {
  const { id } = useParams()
  const route = useLocation().pathname.split("/")[1]

  // eslint-disable-next-line no-unused-vars
  const { errors, requirements, ...body } = useSelector(selectBody)

  const [
    updateData,
    {
      // data: updatedData,
      error: response,
      isLoading: isUpdating,
      isError,
    },
  ] = useUpdateDataQuery(route)

  let content

  if (isUpdating) {
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
    content = <View />
  }

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault()

        const formattedBody = formatBody(body)

        try {
          await updateData({ id, ...formattedBody })
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
          disabled={checkForErrors(body, errors)}
        />
      </div>
    </form>
  )
}
