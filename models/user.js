const {
    movieArchiveSchema
} = require('./movieArchive');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        require: true,
        minlength: 5,
        maxlength: 50
    },
    last_name: {
        type: String,
        require: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        require: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    username: {
        type: String,
        require: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        require: true,
        minlength: 5,
        maxlength: 1024
    },
    movie_archives: [movieArchiveSchema]
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({
        id: this._id
    }, 'jwtPrivateKey');

    return token;
};

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = {
        first_name: Joi.string().min(5).max(50).required(),
        last_name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        username: Joi.string().min(5).max(255).required(),
        password: Joi.string().min(5).max(255).required(),
    };

    return Joi.validate(user, schema);
}

function validateAuth(user) {
    const schema = {
        username: Joi.string().min(5).max(255).required(),
        password: Joi.string().min(5).max(255).required(),
    };

    return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;
exports.validateAuth = validateAuth;