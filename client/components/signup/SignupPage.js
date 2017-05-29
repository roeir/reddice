import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userSignupRequest, isUserExists } from '../../actions/signupActions';
import { addFlashMessage } from '../../actions/flashMessages';
import SignupForm from './SignupForm';

const SignupPage = (props) => {
    const { userSignupRequest, addFlashMessage, isUserExists } = props;
    return (
        <div className="row">
            <div className="col-md-4 col-md-offset-4">
                <SignupForm
                    userSignupRequest={ userSignupRequest }
                    addFlashMessage={ addFlashMessage }
                    isUserExists={ isUserExists }
                />
            </div>
        </div>
    );
};

SignupPage.propTypes = {
    userSignupRequest: PropTypes.func.isRequired,
    isUserExists: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired
};

export default connect(
    null,
    {
        userSignupRequest,
        isUserExists,
        addFlashMessage,
    }
)(SignupPage);