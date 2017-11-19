import { combineReducers } from 'redux'
import {
  SELECT_USER, APPOINTMENT_FETCH_REQUEST, APPOINTMENT_FETCH_SUCCESS,
  APPOINTMENT_FETCH_FAILURE, APPOINTMENT_FETCH_INVALID
} from '../actions'

const selectedUser = (state = 'reactjs', action) => {
  switch (action.type) {
    case SELECT_USER:
      return action.user
    default:
      return state
  }
}

const attendees = (state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) => {
  switch (action.type) {
    case APPOINTMENT_FETCH_INVALID:
      return {
        ...state,
        didInvalidate: true
      }
    case APPOINTMENT_FETCH_REQUEST:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case APPOINTMENT_FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.attendees,
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}

const attendeesByUser = (state = { }, action) => {
  switch (action.type) {
    case APPOINTMENT_FETCH_INVALID:
    case APPOINTMENT_FETCH_SUCCESS:
    case APPOINTMENT_FETCH_REQUEST:
      return {
        ...state,
        [action.user]: attendees(state[action.user], action)
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  attendeesByUser,
  selectedUser
})

export default rootReducer
