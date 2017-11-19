import React from 'react'
import PropTypes from 'prop-types'
import Attendee from '../components/Attendee'

const AttendeeList = ({ attendees, time }) => {
  return (
    <div>
      <h5>In Attendance</h5>
      <ul className="list-group attendee-list">
        {attendees.map(attendee => (
          <li key={attendee.id} className="list-group-item list-group-item-action attendee-list__item">
            <Attendee attendee={attendee} />
          </li>
        ))}
      </ul>
    </div>
  );
};

AttendeeList.propTypes = {
  attendees: PropTypes.array.isRequired
};

export default AttendeeList
