import PropTypes from "prop-types"
import { useState } from "react"

export default function TagsInput({ value }) {
  const [tags, setTags] = useState()

  const handleChange = ({ target }) => {
    const { value } = target

    setTags(value)
  }

  return (
    <input
      className="tags"
      placeholder={value}
      value={tags}
      onChange={handleChange}
    ></input>
  )
}

TagsInput.propTypes = { value: PropTypes.any }
