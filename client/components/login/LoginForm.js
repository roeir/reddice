import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { login } from '../../actions/login';
// import { addFlashMessage } from '../../actions/flashMessages';
import TextFieldGroup from '../common/TextFieldGroup';
import validateInput from '../../../server/shared/validations/login';

class LoginForm extends Component {

    static propTypes = {
        login: PropTypes.func.isRequired,
        history: PropTypes.object.isRequired
    };

    state = {
        ident: '',
        password: '',
        errors: {},
        isLoading: false
    };

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    isValid = () => {
        const { errors, isValid } = validateInput(this.state);
        if(!isValid) {
            this.setState({
               errors
            });
        }
        return isValid;
    };

    onSubmit = (event) => {
        event.preventDefault();
        if(this.isValid()) {
            this.setState({
                errors: {},
                isLoading: true
            });
            this.props.login(this.state).then(({ data }) => {
                if (data.token) {
                    this.props.history.push('/');
                }
            }).catch(({ response: { data } }) => {
                this.setState({
                    errors: data.errors,
                    isLoading: false
                });
            });
        }
    };

    render() {
        const { ident, password, errors, isLoading } = this.state;

        return (
            <form onSubmit={ this.onSubmit }>
                <h1>Login</h1>
                { errors.form && <div className="alert alert-danger" >{ errors.form }</div> }
                <TextFieldGroup
                    name="ident"
                    value={ ident }
                    label="Username / Email"
                    error={ errors.ident }
                    onChange={ this.onChange }
                />

                <TextFieldGroup
                    name="password"
                    value={ password }
                    label="Password"
                    error={ errors.password }
                    onChange={ this.onChange }
                    type="password"
                />

                <div className="form-group">
                    <button
                        type="submit"
                        disabled={ isLoading }
                        className="btn btn-primary btn-lg">
                        Login
                    </button>
                </div>
            </form>
        );
    }
}

export default withRouter(connect(
    null,
    { login }
)(LoginForm));