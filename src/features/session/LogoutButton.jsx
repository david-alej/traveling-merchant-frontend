import { logout } from "./sessionSlice.js"

import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

export default function LogoutButton() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [failedLogout, setFailedLogout] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { payload } = await dispatch(logout())

    if (payload) return setFailedLogout(payload)

    navigate("/login")
  }

  return (
    <>
      {failedLogout && (
        <>
          <p>{failedLogout}</p>
        </>
      )}
      <form onSubmit={handleSubmit}>
        <button type="submit" className="primary">
          <p>Logout</p>
        </button>
      </form>
    </>
  )
}
