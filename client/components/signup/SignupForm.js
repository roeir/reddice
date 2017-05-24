import React, { Component } from 'react';
import timezones from '../../data/timezones';
import map from 'lodash/map';
import PropTypes from 'prop-types';

class SignupForm extends Component {
    static propTypes = {
        userSignupRequest: PropTypes.func.isRequired
    };

    state = {
        username: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        timezone: ''
    };

    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleFormSubmit = (event) => {
        event.preventDefault();
        this.props.userSignupRequest(this.state);
    };

    render() {
        const {
            username,
            email,
            password,
            passwordConfirmation,
            timezone
        } = this.state;

        const options = map(timezones, (val, key) => {
            return (
                <option key={ val } value={ val } >{ key }</option>
            );
        });

        return (
            <form onSubmit={ this.handleFormSubmit }>
                <h1>Join our community!</h1>

                <div className="form-group">
                    <label className="control-label">
                        Username
                    </label>
                    <input
                        value={ username }
                        onChange={ this.handleInputChange }
                        type="text"
                        name="username"
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label className="control-label">
                        Email
                    </label>
                    <input
                        value={ email }
                        onChange={ this.handleInputChange }
                        type="text"
                        name="email"
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label className="control-label">
                        Password
                    </label>
                    <input
                        value={ password }
                        onChange={ this.handleInputChange }
                        type="text"
                        name="password"
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label className="control-label">
                        Password Confirmation
                    </label>
                    <input
                        value={ passwordConfirmation }
                        onChange={ this.handleInputChange }
                        type="text"
                        name="passwordConfirmation"
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label className="control-label">
                        Timezone
                    </label>
                    <select
                        value={ timezone }
                        onChange={ this.handleInputChange }
                        name="timezone"
                        className="form-control"
                    >
                        <option value="" disabled>Choose your timezone</option>
                        { options }
                    </select>
                </div>

                <div className="form-group">
                    <button className="btn btn-primary btn-lg">
                        Sign up
                    </button>
                </div>
            </form>
        )
    }
}

export default SignupForm;