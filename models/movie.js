const Joi = require('joi');
const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    source: {
        type: String,
        require: true
    },
    value: {
        type: String,
        require: true
    },
});
const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    year: {
        type: Number
    },
    rated: {
        type: String,
    },
    released: {
        type: String,
    },
    runtime: {
        type: String,
    },
    genre: {
        type: String,
    },
    director: {
        type: String,
    },
    writer: {
        type: String,
    },
    actors: {
        type: String,
    },
    plot: {
        type: String,
    },
    language: {
        type: String,
    },
    country: {
        type: String,
    },
    awards: {
        type: String,
    },
    poster: {
        type: String,
    },
    metascore: {
        type: String,
    },
    imdb_rating: {
        type: String,
    },
    imdb_votes: {
        type: String,
    },
    imdb_id: {
        type: String,
    },
    type: {
        type: String,
    },
    dvd: {
        type: String,
    },
    box_office: {
        type: String,
    },
    production: {
        type: String,
    },
    website: {
        type: String,
    },
    response: {
        type: String,
    },
    ratings: [ratingSchema]
});

const Movie = mongoose.model('Movie', movieSchema);

function validateMovie(movie) {
    const schema = {
        title: Joi.string().required(),
    };

    return Joi.validate(movie, schema);
}

exports.Movie = Movie;
exports.validate = validateMovie;