import PropTypes from "prop-types"
import { LuSearchX } from "react-icons/lu"

const icons = { [400]: <LuSearchX /> }

export default function ApiError({ error: { originalStatus, data } }) {
  return (
    <div className="api-error">
      {icons[originalStatus]}
      <div className="message">{data}</div>
    </div>
  )
}

ApiError.propTypes = {
  error: PropTypes.object.isRequired,
  originalStatus: PropTypes.number.isRequired,
  data: PropTypes.string.isRequired,
}
