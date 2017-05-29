const express = require('express');
const bcrypt = require('bcrypt');
const isEmpty = require('lodash/isEmpty');
const User = require('../models/user');
const commonValidations = require('../shared/validations/signup');

const router = express.Router();

const validateInput = (data, otherValidations) => {
    let {errors} = otherValidations(data);

    return User.findOne({
        $or: [
            {email: data.email},
            {username: data.username}
        ]
    }).then(user => {
        if (user) {
            if (user.username === data.username) {
                errors.username = 'There is user with such email';
            }
            if (user.email === data.email) {
                errors.email = 'There is user with such email';
            }
        }

        return {
            errors,
            isValid: isEmpty(errors)
        };
    });
};

router.post('/', (req, res) => {
    validateInput(req.body, commonValidations)
        .then(({errors, isValid}) => {
            if (isValid) {
                const {username, password: password_raw, email, timezone} = req.body;
                const password = bcrypt.hashSync(password_raw, 10);
                User.create({
                    username, password, email, timezone
                }).then(() => {
                    res.json({success: true})
                }).catch(err => {
                    res.status(500).json({error: err});
                });
            } else {
                res.status(400).json(errors);
            }
        });
});

router.get('/:ident', (req, res) => {
    const value = req.params.ident;
    User.findOne({
        $or: [
            {email: value},
            {username: value}
        ]
    }, {_id: 0, username: 1, email: 1})
        .then(user => {
            res.json(user);
        })
});

module.exports = router;