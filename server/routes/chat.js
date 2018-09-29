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

router.get('/conversations',checkAuth, (req, res) => {
    const { userId } = req;
    Conversation.find({participants: { $all :[userId]}})
        .populate({
            path: 'participants',
        })
        .then((conversations) => {
            const fullConversations = {};
            conversations.forEach((conversation) => {
                let { title, _id } = conversation;
                if(!title) {
                    const indexOfUser = conversation.participants.indexOf(userId);
                    const companion = conversation.participants.splice(indexOfUser, 1)[0];
                    title = companion.nickname
                }
                Message.find({ conversationId: _id })
                    .sort('-createdAt')
                    .limit(20)
                    .populate({
                        path: 'user',
                        select: 'nickname'
                    })
                    .then((messages) => {
                        fullConversations[_id] = {lastMessages: messages, title};
                        if (Object.keys(fullConversations).length === conversations.length) {
                            console.log(fullConversations);
                            return res.status(200).json({ conversations: fullConversations });
                        }
                    })
            });
        })
        .catch((err) => console.log(err))
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