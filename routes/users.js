const {
    User,
    validate
} = require('../models/user');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const express = require('express');

const router = express.Router();

router.post('/', async (req, res) => {
    const {
        error
    } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({
        username: req.body.username
    });
    if (user) return res.status(400).send('username already exist');

    user = await User.findOne({
        email: req.body.email
    });
    if (user) return res.status(400).send('email already exist');

    user = new User(_.pick(req.body, ['first_name', 'last_name', 'email', 'username', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'first_name', 'last_name', 'email', 'username']));
});

module.exports = router;