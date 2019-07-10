const express = require('express');
const users = require('../routes/users');
const auth = require('../routes/auth');
const movies = require('../routes/movies');
const movieArchives = require('../routes/movieArchives');

module.exports = function (app) {
    app.use(express.json());
    app.use('/api/auth', auth);
    app.use('/api/users', users);
    app.use('/api/movies', movies);
    app.use('/api/movie_archives', movieArchives);
};