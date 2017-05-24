const express = require('express');
const Validator = require('validator');
const isEmpty = require('lodash/isEmpty');
const forEach = require('lodash/forEach');

const router = express.Router();

const validateInput = (data) => {
    let errors = {};

    forEach(data, (value, key) => {
        if (typeof value !== 'string') {
            return;
        }
        if (Validator.isEmpty(value)) {
            errors[key] = `The ${ key } field is required`;
        }
    });

    if (!Validator.isEmail(data.email)) {
        errors.email = 'The email field is invalid';
    }

    if (!Validator.equals(data.password, data.passwordConfirmation)) {
        errors.passwordConfirmation = 'Passwords must match';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};

router.post('/', (req, res) => {
    const {errors, isValid} = validateInput(req.body);

    if (!isValid) {
        res.status(400).json(errors);
    }
});

module.exports = router;