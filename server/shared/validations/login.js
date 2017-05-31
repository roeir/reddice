const Validator = require('validator');
const isEmpty = require('lodash/isEmpty');
const forEach = require('lodash/forEach');

const validateInput = (data) => {
    const errors = {};

    forEach(data, (value, key) => {
       if(typeof value !== 'string') {
           return;
       }
       if(Validator.isEmpty(value)) {
           errors[key] = `The ${ key } field is required`;
       }
    });

    return {
        errors,
        isValid: isEmpty(errors)
    };
};

module.exports = validateInput;