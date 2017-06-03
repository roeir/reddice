import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup';
import { createEvent } from '../../actions/eventActions'

class EventForm extends Component {

  static propTypes = {
    createEvent: PropTypes.func.isRequired
  };

  state = {
    title: '',
    errors: {},
    isLoading: false
  };

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    this.props.createEvent(this.state);
  };

  render() {
    const { title, errors, isLoading } = this.state;

    return (
      <form onSubmit={ this.onSubmit }>
        <h1>Create New Event</h1>
        {/*{ errors.form && <div className="alert alert-danger" >{ errors.form }</div> }*/}
        <TextFieldGroup
          name="title"
          value={ title }
          label="Title"
          error={ errors.title }
          onChange={ this.onChange }
        />

        <div className="form-group">
          <button
            type="submit"
            disabled={ isLoading }
            className="btn btn-primary btn-lg">
            Create
          </button>
        </div>
      </form>
    );
  }
}

export default connect(
  null,
  {
    createEvent
  }
)(EventForm);