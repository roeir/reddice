import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userSignupRequest } from '../../actions/signupActions';
import SignupForm from './SignupForm';

const SignupPage = (props) => {
    const { userSignupRequest } = props;
    return (
        <div className="row">
            <div className="col-md-4 col-md-offset-4">
                <SignupForm userSignupRequest={ userSignupRequest }/>
            </div>
        </div>
    );
};

SignupPage.propTypes = {
    userSignupRequest: PropTypes.func.isRequired
};

export default connect(
    null,
    {
        userSignupRequest
    }
)(SignupPage);