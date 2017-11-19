import React from "react";
import PropTypes from "prop-types";

const Attendee = ({ attendee }) => {
  return (
    <div>
      {attendee.first_name} {attendee.last_name} ({attendee.department}): {attendee.status}
    </div>
  );
};

Attendee.propTypes = {
  first_name: PropTypes.string,
  last_name: PropTypes.string,
  department: PropTypes.string,
  status: PropTypes.string,
};

export default Attendee
