const {
    Movie,
    validate
} = require('../models/movie');
var snakeCaseKeys = require('snakecase-keys');
const auth = require('../middleware/auth');
const _ = require('lodash');
const express = require('express');
const router = express.Router();

const axios = require('axios');

router.get('/', async (req, res) => {
    await axios.get('http://www.omdbapi.com/?i=tt3896198&plot=full&apikey=5757d619')
        .then(async response => {
            response.data.ImdbId = response.data.imdbID;
            delete response.data.imdbID;
            // res.send(snakeCaseKeys(response.data));

            const movie = new Movie(snakeCaseKeys(response.data));
            await movie.save();
            res.send(movie);
        });
});

router.post('/', auth, async (req, res) => {
    // const {
    //     error
    // } = validate(req.body);
    // if (error) return res.status(400).send(error.details[0].message);

    // const movie = new Movie(_.pick(req.body,
    //     ['title', 'year', 'rated', 'released', 'runtime',
    //         'genre', 'director', 'writer', 'actors', 'plot',
    //         'language', 'country', 'awards', 'poster', 'metascore',
    //         'imdb_rating', 'imdb_votes', 'imdb_id', 'type', 'dvd',
    //         'box_office', 'production', 'website', 'response'
    //     ]));
    // await movie.save();
    // res.send(movie);
});

module.exports = router;