import React, { Component } from 'react';
import timezones from '../../data/timezones';
import map from 'lodash/map';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class SignupForm extends Component {
    static propTypes = {
        userSignupRequest: PropTypes.func.isRequired
    };

    state = {
        username: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        timezone: '',
        errors: {},
        isLoading: false
    };

    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleFormSubmit = (event) => {
        event.preventDefault();
        this.setState({
            errors: {},
            isLoading: true
        });
        this.props.userSignupRequest(this.state)
            .then((data) => console.log(data))
            .catch(({ response }) => {
                this.setState({
                    errors: response.data,
                    isLoading: false
                });
            });
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

        const { errors } = this.state;

        return (
            <form onSubmit={ this.handleFormSubmit }>
                <h1>Join our community!</h1>

                <div className={classnames("form-group", {'has-error': errors.username})}>
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
                    { errors.username && <span className="help-block">{ errors.username }</span> }
                </div>

                <div className={classnames("form-group", {'has-error': errors.email})}>
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
                    { errors.email && <span className="help-block">{ errors.email }</span> }
                </div>

                <div className={classnames("form-group", {'has-error': errors.password})}>
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
                    { errors.password && <span className="help-block">{ errors.password }</span> }
                </div>

                <div className={classnames("form-group", {'has-error': errors.passwordConfirmation})}>
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
                    { errors.passwordConfirmation && <span className="help-block">{ errors.passwordConfirmation }</span> }
                </div>

                <div className={classnames("form-group", {'has-error': errors.timezone})}>
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
                    { errors.timezone && <span className="help-block">{ errors.timezone }</span> }
                </div>

                <div className="form-group">
                    <button disabled={ this.state.isLoading } className="btn btn-primary btn-lg">
                        Sign up
                    </button>
                </div>
            </form>
        )
    }
}

export default SignupForm;