import Spinner from "../Spinner.jsx"
import { useUpdateDataQuery } from "../../util/query-utils.jsx"

import { useParams, useLocation } from "react-router-dom"
import View from "./View.jsx"
import { useState } from "react"

export default function Edit() {
  const { id } = useParams()
  const route = useLocation().pathname.split("/")[1]
  const [body, setBody] = useState({})

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

  let content = <></>

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
    content = <View body={body} onChangeBody={setBody} />
  }

  return (
    <>
      {content}
      <button
        className="submit-edit"
        onClick={async (body) => {
          try {
            await updateData({ id, body })
          } catch (err) {
            console.log(err)
          }
        }}
      >
        Submit
      </button>
    </>
  )
}
