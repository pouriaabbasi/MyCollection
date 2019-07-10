const {
    MovieArchive,
    validate
} = require('../models/movieArchive');
const {
    User
} = require('../models/user');
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();

router.get('/', auth, async (req, res) => {
    const user = await User.findById(req.user._id);

    res.send(user.movie_archives);
});

router.get('/:id', auth, async (req, res) => {
    const user = await User.findById(req.user._id);

    const movieArchive = user.movie_archives.find(x => x._id == req.params.id);
    if (!movieArchive) return res.status(400).send('Invalid movie archive');

    res.send(movieArchive);
});

router.post('/', auth, async (req, res) => {
    const {
        error
    } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findById(req.user._id);

    user.movie_archives.push(new MovieArchive(req.body));
    user.save();
    res.send(user.movie_archives);
});

router.put('/:id', auth, async (req, res) => {
    const {
        error
    } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findById(req.user._id);

    const movieArchive = user.movie_archives.find(x => x._id == req.params.id);
    if (!movieArchive) return res.status(400).send('Invalid movie archive');

    movieArchive.name = req.body.name;
    movieArchive.code = req.body.code;
    movieArchive.description = req.body.description;
    movieArchive.child_code_pattern = req.body.child_code_pattern;

    user.save();

    res.send(movieArchive);
});

router.delete('/:id', auth, async (req, res) => {
    const user = await User.findById(req.user._id);

    const movieArchive = user.movie_archives.find(x => x._id == req.params.id);
    if (!movieArchive) return res.status(400).send('Invalid movie archive');

    movieArchive.remove();

    user.save();

    res.send(true);
});

module.exports = router;