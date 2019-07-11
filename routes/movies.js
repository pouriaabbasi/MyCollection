const {
    Movie,
    validate
} = require('../models/movie');
const {
    User
} = require('../models/user');
const {
    MovieArchive
} = require('../models/movieArchive');
const auth = require('../middleware/auth');
const _ = require('lodash');
var snakeCaseKeys = require('snakecase-keys');
const axios = require('axios');
const express = require('express');
const router = express.Router();

router.get('/', auth, async (req, res) => {
    const movies = await getUserMovies(req.user._id);
    res.send(movies);
});

router.get('/:id', auth, async (req, res) => {
    const movies = await getUserMovies(req.user._id);
    const movie = movies.find(x => x._id == req.params.id);
    res.send(movie);
});

router.post('/:archiveId', auth, async (req, res) => {
    const user = await User.findById(req.user._id);
    const movie_archive = user.movie_archives.id(req.params.archiveId);
    if (!movie_archive) return res.status(400).send('Invalid movie archive id');

    const {
        error
    } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const movie = new Movie(req.body);
    movie.save();

    movie_archive.movies.push({
        title: movie.title,
        movie_id: movie._id
    });

    user.save();

    res.send(movie);
});

async function getUserMovies(userId) {
    const user = await User.findById(userId);
    const movies = [];
    user.movie_archives.forEach(movie_archive => {
        movie_archive.movies.forEach(movie => {
            movies.push(movie);
        });
    });

    return movies;
}

module.exports = router;