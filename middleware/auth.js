const {
    User
} = require('../models/user');
const _ = require('lodash');
const jwt = require('jsonwebtoken');

async function auth(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied. No token provided.');

    try {
        const decoded = jwt.verify(token, 'jwtPrivateKey');
        const user = await User.findById(decoded.id);
        if (!user) throw new Error('Invalid token');
        req.user = _.pick(user, ['_id', 'first_name', 'last_name', 'email', 'username']);
        next();
    } catch (ex) {
        return res.status(400).send('Invalid token');
    }
}

module.exports = auth;