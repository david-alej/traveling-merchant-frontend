import { login } from "./sessionSlice.js"
import Button from "../../components/Button.jsx"
import ErrorBox from "../../components/ErrorBox.jsx"
import "./Login.css"

import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [username, setUsername] = useState("missioneros")
  const [password, setPassword] = useState("nissiJire2")
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
      const { error } = await dispatch(login({ username, password }))

      if (!error) navigate("/dashboard")

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
    <section id="login-container">
      <div id="login">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div id="login-inputs">
            <ErrorBox className="login" exists={hasError}>
              {failedLogin}
            </ErrorBox>
            <div className="login-input username">
              <label>Username</label>
              <input
                id="username"
                name="username"
                value={username}
                onChange={handleUsernameChange}
                maxLength="20"
                required
              />
            </div>
            <div className="login-input password">
              <label>Password</label>
              <input
                id="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
                maxLength="20"
                required
              />
            </div>
          </div>
          <div id="login-submit">
            <Button
              type="submit"
              className="primary"
              text="Sign In"
              onClick={() => {}}
            />
          </div>
        </form>
      </div>
    </section>
  )
}
