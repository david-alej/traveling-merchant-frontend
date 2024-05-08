import { FaEye } from "react-icons/fa"

import PropTypes from "prop-types"

export default function ViewButton({ route, id }) {
  const props = { className: "view action-button" }

  if (route && id) props.onClick = () => {}

  return (
    <div {...props}>
      <FaEye size={23} />
    </div>
  )
}

ViewButton.propTypes = {
  route: PropTypes.string,
  id: PropTypes.number,
}
