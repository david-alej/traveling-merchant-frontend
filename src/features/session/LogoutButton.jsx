import { logout } from "./sessionSlice.js"
import Button from "../../components/Button.jsx"

import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { MdLogout } from "react-icons/md"

export default function LogoutButton() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [failedLogout, setFailedLogout] = useState("")

  const handleClick = async (e) => {
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
      <Button
        className="primary"
        onClick={handleClick}
        text="Logout"
        icon={<MdLogout size={23} />}
      />
      {/* <form onSubmit={handleSubmit}>
        <button type="submit" className="primary">
          <p>Logout</p>
        </button>
      </form> */}
    </>
  )
}
