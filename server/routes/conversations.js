const express = require('express');
const bodyParser = require('body-parser');
const User = require('../models/User');

const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const checkAuth = require('../middlewares/auth/checkAuth');

const router = express.Router();

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

router.get('/privates', checkAuth, (req, res) => {
    const { userId } = req;
    Conversation.find({participants: userId})
        .populate({
            path: 'participants',
        })
        .then((conversations) => {
            const fullConversations = {};
            if (!conversations.length) {
                return res.status(200).json({ conversations: fullConversations });
            }
            conversations.forEach((conversation) => {
                const {_id, participants} = conversation;
                const indexOfUser = participants.map((user) => user._id.toString()).indexOf(userId.toString());
                const companion = participants.filter((item, index) => index !== indexOfUser)[0];
                const title = companion.nickname;
                const image = companion.image;
                const online = companion.online;

                Message.find({ conversationId: _id, available: userId} )
                    .populate({
                        path: 'user',
                        select: 'nickname'
                    })
                    .then((messages) => {
                        fullConversations[_id] = {lastMessages: messages, title, id: _id, image, online };
                        if (Object.keys(fullConversations).length === conversations.length) {
                            return res.status(200).json({ conversations: fullConversations });
                        }
                    })
            });
        })
        .catch((err) => console.log(err))
});

router.get('/groups', checkAuth, (req, res) => {
    const { userId } = req;
    Conversation.find({participants: userId,  author: { $exists: true}})
        .populate({
            path: 'participants',
        })
        .then((conversations) => {
            const fullConversations = {};
            if (!conversations.length) {
                return res.status(200).json({ conversations: fullConversations });
            }
            conversations.forEach((conversation) => {
                let { title, _id, participants, image } = conversation;
                Message.find({ conversationId: _id, available: userId} )
                    .populate({
                        path: 'user',
                        select: 'nickname'
                    })
                    .then((messages) => {
                        fullConversations[_id] = {lastMessages: messages, title, id: _id, image, participants };
                        if (Object.keys(fullConversations).length === conversations.length) {
                            return res.status(200).json({ conversations: fullConversations });
                        }
                    })
            });
        })
        .catch((err) => console.log(err))
});

/**
 * route http://localhost:5000/conversations/create'
 * For creating new conversation
 * @param req.userId {String} - User's
 * @param req.body.participants {Array} - Array of participants in conversation
 * @param req.body.title {String} - Conversation's title
 */

router.post('/create', checkAuth, (req, res) => {
    const { participants, title, image, author } = req.body;
    // console.log(7, req.userId);
    const { userId } = req;
    User.find({_id: {$in: participants}})
        .then((users) => Conversation.create({
            participants: users.map((user) => user._id),
            title,
            image,
            author
        }))
        .then(c => Message.find({ conversationId: c._id, available: userId}).then(messages => {
            return {
                title: c.title,
                id: c._id,
                image: c.image,
                participants: c.participants,
                lastMessages: messages
            }
        }))
        .then((conversation) => res.status(200).json(conversation))
        .catch(err => res.status(500).send(err));
});

/**
 * route http://localhost:5000/conversations/conversationByCompanion/:companionId'
 * For getting conversation by user's companion Id
 * @param req.userId {String} - User's id
 * @param req.params.companionId {String} - Companion's id
 */

router.get('/conversationByCompanion/:companionId', checkAuth, (req, res) => {
    const { userId } = req;
    const { companionId } = req.params;
    Conversation.findOne({ participants: {$in: [[userId, companionId],[companionId, userId]]}})
        .then((conversation) =>{console.log(666, conversation); return res.status(200).json(conversation)})
        .catch((err) => console.log(err));

});

module.exports = router;