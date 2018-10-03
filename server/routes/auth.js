const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

const User = require('../models/User');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/authConfig');

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

router.post('/register',upload.single('avatar'), (req, res) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);

    const user = new User({
        nickname: req.body.nickname,
        email: req.body.email,
        password: hashedPassword,
        image: req.file.path,
    });
    user.save()
        .then(user => {
            console.log(user);
            const token = jwt.sign({id: user._id}, config.secret, {
                expiresIn: 86400 //24 hours
            });
            res.status(200).send({token, user: {nickname: user.nickname, _id:user._id}});
        })
        .catch(() => res.status(500).send({message: 'Something wrong with registration.'}))
});

router.post('/login', (req, res) => {
    User.findOne({email: req.body.email})
        .then(user => {
            if (!user) return res.status(404).send({message: 'User not found.'});
            const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
            if (!passwordIsValid) return res.status(401).send({message: 'Invalid password!'});
            const token = jwt.sign({id: user._id}, config.secret, {
                expiresIn: 86400 // 24 hours
            });
            res.status(200).send({token, user: {nickname: user.nickname, _id:user._id}});
        })
        .catch(() => res.status(500).send({message: 'Error on the server.'}))
});

router.get('/logout', (req, res) => {
    res.status(200).send({token: null});
});

router.get('/check-token', (req, res) => {
    const token = req.headers['access-token'];
    if (!token) {
        return res.status(401).send();
    }
    console.log(req.userId);
    User.findById(req.userId)
        .then((user) => res.status(200).send({ user: {nickname: user.nickname, _id:user._id}}));
});

module.exports = router;