import { FaEdit } from "react-icons/fa"

import PropTypes from "prop-types"
import { useNavigate } from "react-router-dom"

export default function EditButton({ route, id }) {
  const navigate = useNavigate()
  const props = { className: "edit action-button" }

  if (route && id) props.onClick = () => navigate(`/${route}/edit/${id}`)

  return (
    <div {...props}>
      <FaEdit size={23} />
    </div>
  )
}

EditButton.propTypes = {
  route: PropTypes.string,
  id: PropTypes.number,
}
