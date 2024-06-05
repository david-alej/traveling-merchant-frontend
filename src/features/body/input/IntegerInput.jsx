import { camelToFlat } from "../../../util/body-utils"

import PropTypes from "prop-types"

export default function IntegerInput({ property, selected, setSelected }) {
  const integer = selected[property]

  return (
    <input
      placeholder="integer"
      value={integer}
      onChange={({ target }) =>
        setSelected((prev) => ({ ...prev, [property]: target.value }))
      }
    />
  )
}
IntegerInput.propTypes = {
  property: PropTypes.string.isRequired,
  selected: PropTypes.object.isRequired,
  setSelected: PropTypes.func.isRequired,
}
