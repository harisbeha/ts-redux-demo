import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  selectUser,
  fetchAppointmentIfNeeded,
  invalidateAppointment
} from "../actions";
import Picker from "../components/Picker";
import AttendeeList from "../components/AttendeeList";

class App extends Component {
  static propTypes = {
    selectedUser: PropTypes.string.isRequired,
    attendees: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { dispatch, selectedUser } = this.props;
    dispatch(fetchAppointmentIfNeeded(selectedUser));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedUser !== this.props.selectedUser) {
      const { dispatch, selectedUser } = nextProps;
      dispatch(fetchAppointmentIfNeeded(selectedUser));
    }
  }

  handleChange = nextUser => {
    this.props.dispatch(selectUser(nextUser));
  };

  handleRefreshClick = e => {
    e.preventDefault();

    const { dispatch, selectedUser } = this.props;
    dispatch(invalidateAppointment(selectedUser));
    dispatch(fetchAppointmentIfNeeded(selectedUser));
  };

  render() {
    const { selectedUser, attendees, isFetching, lastUpdated } = this.props;
    const isEmpty = attendees.length === 0;
    return (
      <div>
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h1 className="display-3">Master Calendar</h1>
            <p className="lead">
              This simple example written uses React / Redux to display meeting
              attendees.
            </p>
            {lastUpdated && (
              <span>
                Last updated at {new Date(lastUpdated).toLocaleTimeString()}.{" "}
              </span>
            )}
            {!isFetching && (
              <button
                className="btn btn-primary"
                onClick={this.handleRefreshClick}
              >
                Refresh
              </button>
            )}
          </div>
        </div>
        <div className="container">
          <Picker
            value={selectedUser}
            onChange={this.handleChange}
            options={["msmith", "jbreaux"]}
          />
        </div>
        {isEmpty ? (
          isFetching ? (
            <h2>Loading...</h2>
          ) : (
            <h2>Empty.</h2>
          )
        ) : (
          <div className="container">
            <div style={{ opacity: isFetching ? 0.5 : 1 }}>
              <AttendeeList attendees={attendees} />
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { selectedUser, attendeesByUser } = state;
  const { isFetching, lastUpdated, items: attendees } = attendeesByUser[
    selectedUser
  ] || {
    isFetching: true,
    items: []
  };

  return {
    selectedUser,
    attendees,
    isFetching,
    lastUpdated
  };
};

export default connect(mapStateToProps)(App);
