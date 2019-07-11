const mongoose = require('mongoose');
const Joi = require('joi');

const movieSchema = new mongoose.Schema({
    movie_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie'
    },
    title: {
        type: String,
        require: true
    }
});
const movieArchiveSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    code: {
        type: String,
        require: true
    },
    child_code_pattern: {
        type: String
    },
    description: {
        type: String
    },
    movies: [movieSchema]
});

const MovieArchive = mongoose.model('MovieArchive', movieArchiveSchema);

function validateMovieArchive(movieArchive) {
    const schema = {
        name: Joi.string().required(),
        code: Joi.string().required(),
        child_code_pattern: Joi.string().optional(),
        description: Joi.string().optional()
    };

    return Joi.validate(movieArchive, schema);
}

module.exports.movieArchiveSchema = movieArchiveSchema;
module.exports.MovieArchive = MovieArchive;
module.exports.validate = validateMovieArchive;