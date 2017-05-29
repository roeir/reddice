const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const validateInput = require('../shared/validations/signup');

const router = express.Router();

router.post('/', (req, res) => {
    const {errors, isValid} = validateInput(req.body);

    if (isValid) {
        const { username, password: password_raw, email, timezone } = req.body;
        const password = bcrypt.hashSync(password_raw, 10);
        User.create({
            username, password, email, timezone
        }).then(() => {
            res.json({ success: true })
        }).catch(err => {
            res.status(500).json({ error: err });
        });
    } else {
        res.status(400).json(errors);
    }
});

module.exports = router;