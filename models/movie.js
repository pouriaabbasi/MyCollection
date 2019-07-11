const Joi = require('joi');
const mongoose = require('mongoose');

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
    ratings: [new mongoose.Schema({
        source: {
            type: String,
            require: true
        },
        value: {
            type: String,
            require: true
        },
    })]
});

const Movie = mongoose.model('Movie', movieSchema);

function validateMovie(movie) {
    const schema = {
        title: Joi.string().required(),
        year: Joi.number().optional(),
        rated: Joi.string().optional(),
        released: Joi.string().optional(),
        runtime: Joi.string().optional(),
        genre: Joi.string().optional(),
        director: Joi.string().optional(),
        writer: Joi.string().optional(),
        actors: Joi.string().optional(),
        plot: Joi.string().optional(),
        language: Joi.string().optional(),
        country: Joi.string().optional(),
        awards: Joi.string().optional(),
        poster: Joi.string().optional(),
        metascore: Joi.string().optional(),
        imdb_rating: Joi.string().optional(),
        imdb_votes: Joi.string().optional(),
        imdb_id: Joi.string().optional(),
        type: Joi.string().optional(),
        dvd: Joi.string().optional(),
        box_office: Joi.string().optional(),
        production: Joi.string().optional(),
        website: Joi.string().optional(),
        response: Joi.string().optional(),
        ratings: Joi.array().optional(),
    };

    return Joi.validate(movie, schema);
}

exports.Movie = Movie;
exports.validate = validateMovie;