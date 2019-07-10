const {
    User,
    validateAuth
} = require('../models/user');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const {
        error
    } = validateAuth(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({
        username: req.body.username
    });
    if (!user) return res.status(400).send('username or password is not valid');

    const passwordValid = await bcrypt.compare(req.body.password, user.password);
    if (!passwordValid) return res.status(400).send('username or password is not valid');

    const token = user.generateAuthToken();

    res.send(token);
});



module.exports = router;