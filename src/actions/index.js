export const APPOINTMENT_FETCH_REQUEST = 'APPOINTMENT_FETCH_REQUEST'
export const APPOINTMENT_FETCH_SUCCESS = 'APPOINTMENT_FETCH_SUCCESS'
export const APPOINTMENT_FETCH_FAILURE = 'APPOINTMENT_FETCH_FAILURE'
export const APPOINTMENT_FETCH_INVALID = 'APPOINTMENT_FETCH_INVALID'
export const SELECT_USER = 'SELECT_USER'


export const selectUser = user => ({
  type: SELECT_USER,
  user
})

export const invalidateAppointment = user => ({
  type: APPOINTMENT_FETCH_INVALID,
  user
})

export const requestAppointment = user => ({
  type: APPOINTMENT_FETCH_REQUEST,
  user
})

export const receiveAppointment = (user, json) => ({
  type: APPOINTMENT_FETCH_SUCCESS,
  user,
  attendees: json.map(child => child),
  receivedAt: Date.now()
})

const fetchAppointment = user => dispatch => {
  dispatch(requestAppointment(user))
  return fetch(`https://my.api.mockaroo.com/appointments/123.json?key=122d9ae0`)
    .then(response => response.json())
    .then(json => dispatch(receiveAppointment(user, json)))
}

const shouldFetchAppointment = (state, user) => {
  const attendees = state.attendeesByUser[user]
  if (!attendees) {
    return true
  }
  if (attendees.isFetching) {
    return false
  }
  return attendees.didInvalidate
}

export const fetchAppointmentIfNeeded = user => (dispatch, getState) => {
  if (shouldFetchAppointment(getState(), user)) {
    return dispatch(fetchAppointment(user))
  }
}
