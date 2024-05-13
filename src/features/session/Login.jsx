import { login } from "./sessionSlice.js"

import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Button from "../../components/Button.jsx"

export default function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [failedLogin, setFailedLogin] = useState("")

  const { hasError } = useSelector((state) => state.session)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const failedLoginMsg =
      "Invalid Login: either username and/or password are wrong and do not match any signed up merchant credentials."

    const usernameIsInvalid = username.includes(" ") || username.length < 4
    const passwordIsInvalid =
      password.includes(" ") ||
      password.length < 8 ||
      !/\d/g.test(password) ||
      !/[a-zA-Z]/g.test(password)

    if (usernameIsInvalid || passwordIsInvalid) {
      setFailedLogin(failedLoginMsg)
    } else {
      await dispatch(login({ username, password }))

      if (!hasError) navigate("/dashboard")

      setFailedLogin(failedLoginMsg)
    }
  }

  const handleUsernameChange = ({ target }) => {
    const newUsername = target.value

    setUsername(newUsername)
  }

  const handlePasswordChange = ({ target }) => {
    const newPassword = target.value

    setPassword(newPassword)
  }

  return (
    <section className="login">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <p>{failedLogin}</p>
        </div>
        <div>
          <label>Username</label>
          <input
            id="username"
            name="username"
            value={username}
            onChange={handleUsernameChange}
            maxLength="20"
            required
          />
          <label>Password</label>
          <input
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            maxLength="20"
            required
          />
          <Button
            type="submit"
            className="primary"
            text="Sign In"
            onClick={() => {}}
          />
        </div>
      </form>
    </section>
  )
}
