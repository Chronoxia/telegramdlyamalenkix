const express = require('express');
const bodyParser = require('body-parser');

const User = require('../models/User');
const checkAuth = require('../middlewares/auth/checkAuth');

const router = express.Router();

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

/**
 * route http://localhost:5000/users
 * For getting all users
 */

router.get('/', checkAuth, (req, res) => {
    User.find()
        .select('-password')
        .then(users => {
            res.status(200).json(users)
        })
});

/**
 * route http://localhost:5000/users/search/:input'
 * For searching all users which email started with certain input
 * @param req.params.input {String} - pattern for searching users in db
 */

router.get('/search/:input',  checkAuth, (req, res) => {
    const { input } = req.params;
    const pattern = `^${input}`;
    User.find({email:{$regex: pattern}})
        .select('-password')
        .then((users) => res.status(200).json(users))
        .catch((err) => console.log(err))
});

module.exports = router;