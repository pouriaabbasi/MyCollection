const {
    Movie,
    validate
} = require('../models/movie');
const {
    User
} = require('../models/user');
const auth = require('../middleware/auth');
const _ = require('lodash');
var snakeCaseKeys = require('snakecase-keys');
const axios = require('axios');
const express = require('express');
const router = express.Router();

router.get('/getall', auth, async (req, res) => {
    const movies = await getUserMovies(req.user._id);
    res.send(movies);
    // const test =
    //     await
    // User.findById(req.user._id)
    //     .select('movie_archives.$');

    // res.send(test);
});

router.get('/get/:id', auth, async (req, res) => {
    const movies = await getUserMovies(req.user._id);
    const movie = movies.find(x => x._id == req.params.id);
    res.send(movie);
});

router.get('/insert/:archiveId/:imdbid', auth, async (req, res) => {
    const user = await User.findById(req.user._id);
    const movie_archive = user.movie_archives.id(req.params.archiveId);
    if (!movie_archive) return res.status(400).send('Invalid movie archive id');

    await axios.get('http://www.omdbapi.com/?i=' + req.params.imdbid + '&plot=full&apikey=5757d619')
        .then(async response => {
            response.data.ImdbId = response.data.imdbID;
            delete response.data.imdbID;

            const {
                error
            } = validate(snakeCaseKeys(response.data));
            if (error) return res.status(400).send(error.details[0].message);

            const movie = new Movie(snakeCaseKeys(response.data));
            movie.save();

            movie_archive.movies.push({
                title: movie.title,
                movie_id: movie._id
            });

            user.save();

            res.send(movie);
        });
});

router.post('/add/:archiveId', auth, async (req, res) => {
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

router.post('/search', auth, async (req, res) => {
    await axios.get('http://www.omdbapi.com/?s=' + req.body.search + '&page=' + req.body.page + '&type=movie&apikey=5757d619')
        .then(async response => {
            if (response.data.Response == "False")
                return res.status(400).send(response.data.Error);

            res.send(response.data);
        });
});

router.put('/update/:archiveId', auth, async (req, res) => {

});

router.delete('/delete/:archiveId/:movieId', auth, async (req, res) => {

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