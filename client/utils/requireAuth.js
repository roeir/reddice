import React, { Component }  from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addFlashMessage } from '../actions/flashMessages';

export default ComposedComponent => {
  class Authentication extends Component {
    state = {
      redirectToReferrer: false
    };

    static propTypes = {
      isAuthenticated: PropTypes.bool.isRequired,
      addFlashMessage: PropTypes.func.isRequired,
      history: PropTypes.object.isRequired
    };

    componentWillMount() {
      if(!this.props.isAuthenticated) {
        this.props.addFlashMessage({
          type: 'error',
          text: 'You need to login to access this page'
        });
        this.props.history.push('/login');
      } else {
        this.setState({
          redirectToReferrer: true
        });
      }
    }

    componentWillUpdate(nextProps) {
      if(!nextProps.isAuthenticated) {
        this.props.history.push('/');
      }
    }

    render() {
      return (
        <ComposedComponent { ...this.props }/>
      );
    }
  }

  const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
  });

  return withRouter(connect(mapStateToProps, {
    addFlashMessage
  })(Authentication));
};


