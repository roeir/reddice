import React from "react";
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import { logout } from '../actions/authActions';

const NavigationBar = (props) => {
  const { isAuthenticated } = props.auth;

  const guestLinks = (
    <ul className="nav navbar-nav navbar-right">
      <li>
        <NavLink to="/signup">Signup</NavLink>
      </li>
      <li>
        <NavLink to="/login">Login</NavLink>
      </li>
    </ul>
  );

  const userLinks = (
    <ul className="nav navbar-nav navbar-right">
      <li>
        <NavLink to="/new-event">New Event</NavLink>
      </li>
      <li>
        <a href="#" onClick={ (event) => { event.preventDefault(); props.logout() }  }>Logout</a>
      </li>
    </ul>
  );

  return (
    <nav className="navbar navbar-default navbar-static-top">
      <div className="container-fluid">
        <div className="navbar-header">
          <NavLink to="/" className="navbar-brand">Red Dice</NavLink>
        </div>

        <div className="collapse navbar-collapse">
          { isAuthenticated ? userLinks : guestLinks }
        </div>
      </div>
    </nav>
  );
};

NavigationBar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  {
    logout
  }
)(NavigationBar);