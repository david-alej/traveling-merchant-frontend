import { FaEye } from "react-icons/fa"
import { FaEdit } from "react-icons/fa"
import { FaDeleteLeft } from "react-icons/fa6"
import { MdDeleteForever } from "react-icons/md"
import Button from "./Button"

import PropTypes from "prop-types"
import { useNavigate } from "react-router-dom"

const actions = [
  { type: "view", icon: <FaEye size={23} />, endpoint: "" },
  { type: "edit", icon: <FaEdit size={23} />, endpoint: "/edit" },
  { type: "delete", icon: <FaDeleteLeft size={23} />, endpoint: "/delete" },
]

export default function ActionButton({
  index,
  type,
  route,
  id,
  text,
  className,
  isTrashIcon = false,
}) {
  const navigate = useNavigate()

  const { icon, endpoint } = actions.find((action) => action.type === type)
  const props = {
    key: index,
    className: type + " action-button" + (className ? " " + className : ""),
    icon,
    onClick: () => navigate(`/${route}/${id}` + endpoint),
  }

  if (text) props.text = text
  if (type === "delete" && isTrashIcon) {
    props.icon = <MdDeleteForever size={23} />
  }

  return <Button {...props} />
}

ActionButton.propTypes = {
  index: PropTypes.number,
  type: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  text: PropTypes.string,
  className: PropTypes.string,
  isTrashIcon: PropTypes.bool,
}
