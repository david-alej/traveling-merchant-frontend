import { camelToFlat } from "../../../util/data-utils"

import PropTypes from "prop-types"

export default function IntegerInput({ property, selected, setSelected }) {
  const integer = selected[property]

  return (
    <div className="element-part">
      <p>{camelToFlat(property)}</p>
      <input
        placeholder="integer"
        value={integer}
        onChange={({ target }) =>
          setSelected((prev) => ({ ...prev, [property]: target.value }))
        }
      />
    </div>
  )
}
IntegerInput.propTypes = {
  property: PropTypes.string.isRequired,
  selected: PropTypes.object.isRequired,
  setSelected: PropTypes.func.isRequired,
}
