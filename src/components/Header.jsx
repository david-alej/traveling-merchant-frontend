import LogoutButton from "../features/session/LogoutButton"

import { useSelector } from "react-redux"

export default function Header() {
  const merchantName = useSelector((state) => state.session.merchantName)

  return (
    <>
      <header className={merchantName ? "accessed" : "initialized"}>
        {merchantName ? (
          <>
            <div id="left-header"></div>
            <div id="right-header">
              <p>{merchantName}</p>
              <LogoutButton />
            </div>
          </>
        ) : (
          <h1>Traveling Merchant</h1>
        )}
      </header>
    </>
  )
}
