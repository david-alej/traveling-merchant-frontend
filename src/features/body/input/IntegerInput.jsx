import PropTypes from "prop-types"

export default function IntegerInput({ property, selected, setSelected }) {
  return (
    <input
      placeholder="integer"
      value={selected[property]}
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
