import React, { Component } from 'react';
import timezones from '../../data/timezones';
import map from 'lodash/map';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';
import validateInput  from '../../../server/shared/validations/signup';
import TextFieldGroup from '../common/TextFieldGroup';

class SignupForm extends Component {
    static propTypes = {
        userSignupRequest: PropTypes.func.isRequired,
        addFlashMessage: PropTypes.func.isRequired,
        history: PropTypes.object.isRequired
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
        if(this.isValid()) {
            this.setState({
                errors: {},
                isLoading: true
            });
            this.props.userSignupRequest(this.state)
                .then(({ data }) => {
                    if(data.success) {
                        this.props.addFlashMessage({
                            type: 'success',
                            text: 'You have sign up successfully. Welcome!'
                        });
                        this.props.history.push('/');
                    }
                })
                .catch(({ response }) => {
                    this.setState({
                        errors: response.data,
                        isLoading: false
                    });
                });
        }
    };

    isValid() {
        const { errors, isValid } = validateInput(this.state);
        if(!isValid) {
            this.setState({ errors });
        }
        return isValid;
    }

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

                <TextFieldGroup
                    value={ username }
                    onChange={ this.handleInputChange }
                    name="username"
                    label="Username"
                    error={ errors.username }
                />
                <TextFieldGroup
                    value={ email }
                    onChange={ this.handleInputChange }
                    name="email"
                    label="Email"
                    error={ errors.email }
                />
                <TextFieldGroup
                    value={ password }
                    onChange={ this.handleInputChange }
                    name="password"
                    label="Password"
                    error={ errors.password }
                />
                <TextFieldGroup
                    value={ passwordConfirmation }
                    onChange={ this.handleInputChange }
                    name="passwordConfirmation"
                    label="Password Confirmation"
                    error={ errors.passwordConfirmation }
                />

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

export default withRouter(SignupForm);