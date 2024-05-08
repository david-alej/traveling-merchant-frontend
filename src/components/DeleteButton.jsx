import { FaDeleteLeft } from "react-icons/fa6"
import { MdDeleteForever } from "react-icons/md"

import PropTypes from "prop-types"
import { useNavigate } from "react-router-dom"

export default function DeleteButton({ route, id, isTrashIcon }) {
  const navigate = useNavigate()
  const props = { className: "delete action-button" }

  if (route && id) props.onClick = () => navigate(`/${route}/delete/${id}`)

  return (
    <div {...props}>
      {isTrashIcon ? <MdDeleteForever size={23} /> : <FaDeleteLeft size={23} />}
    </div>
  )
}

DeleteButton.propTypes = {
  route: PropTypes.string,
  id: PropTypes.number,
  isTrashIcon: PropTypes.bool,
}
