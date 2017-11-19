import React from 'react'
import PropTypes from 'prop-types'

const Picker = ({ value, onChange, options }) => (
  <span>
    <h1>Showing meeting info for {value === "reactjs" ? options[0] : value}</h1>
    <select className="form-control"
            onChange={e => onChange(e.target.value)}
            value={value}>
      {options.map(option =>
        <option value={option} key={option}>
          {option}
        </option>)
      }
    </select>
  </span>
)

Picker.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.string.isRequired
  ).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default Picker
