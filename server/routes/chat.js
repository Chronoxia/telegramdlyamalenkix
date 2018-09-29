const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const User = require('../models/User');

const checkAuth = require('../middlewares/auth/checkAuth');

router.get('/users', checkAuth, (req, res) => {
    User.find()
        .select('-password')
        .then(users => {
            res.status(200).json(users)
        })
});

router.get('/conversation', checkAuth, (req, res) => {
    console.log(req.query.myId, req.query.userId);
    const { myId, userId } = req.query;
    User.findOne({_id: myId})
        .then(() => User.findOne({_id: userId}), (err) => console.log(err))
        .then(() => Conversation.findOne({participants: { $all :[myId, userId]}}))
        .then((conversation) => {
            if(!conversation) {
                return Conversation.create({
                    participants: [myId, userId]
                })
            }
            return Message.find({conversationId: conversation._id})
                .then((messages) => { 
                    console.log(2);
                    return {conversation, messages} 
                })
        })
        .then((conversationData) => res.status(200).send({conversationData}))
        .catch(err => console.log(err))

});

router.get('/conversations', (req, res) => {
    Conversation.find()
        .select('_id')
        .then((conversations) => {
            const fullConversations = [];
            conversations.forEach((conversation) => {
                Message.find({ conversationId: conversation._id })
                    .sort('-createdAt')
                    .limit(1)
                    .populate({
                        path: 'author',
                        select: 'nickname'
                    })
                    .then((message) => {
                        console.log(message[0]);
                        fullConversations.push(message[0]);
                        if (fullConversations.length === conversations.length) {
                            return res.status(200).json({ conversations: fullConversations });
                        }
                    })
            });
        })
        .catch((err) => console.log(err))
});
router.post('/message', checkAuth, (req, res) => {
    const { message, conversationId, author } = req.body;
    console.log(message, conversationId, author);
    Message.create({
        conversationId,
        author,
        text: message.text
    })
        .then((message) => res.status(200).send({message}))

});

module.exports = router;