const express = require('express');
const bodyParser = require('body-parser');

const User = require('../models/User');
const Conversation = require('../models/Conversation');
const Messages = require('../models/Message');
const checkAuth = require('../middlewares/auth/checkAuth');
const router = express.Router();

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

const users = {};

router.get('/all/:conversationId', checkAuth, (req, res) => {
    const { offset } = req.query;
    const { conversationId } = req.params;
    const limit = 10;
    Messages
        .find({conversationId})
        .sort("-createdAt")
        .limit(limit)
        .skip(limit * offset)
        .then((messages) => res.status(200).json(messages))
        .catch((err) => res.status(200).json(err))
});

/**
 * route http://localhost:5000/messages/create'
 * For creating new message
 * @param req.body.text {String} - Message's text
 * @param req.body.conversationId {String} - Conversations's id
 * @param req.body.conversationId {String} - Author's id
 */
router.post('/create', checkAuth, (req, res) => {
    const {text, conversationId, authorId} = req.body;
    req.io.emit('yay', 'yay');
    Conversation.findById(conversationId)
        .then((conversation) => {
            if (!conversation) {
                const {companionId} = req.body;

                return Conversation.create({
                        participants: [authorId, companionId]
                    })
                    .then(async conversation => {
                        const users = require('../index').users;
                        const keys = Object.keys(users);
                        const author = await User.findById(authorId);
                        const companion = await User.findById(companionId);

                        keys.forEach(k => {
                            if (conversation.participants.some(p => p.toString() === users[k] && users[k] === authorId)) {
                                req.io.to(k).emit('CONVERSATION_RECEIVE', {
                                    _id: conversation._id,
                                    messages: [],
                                    title: companion.nickname,
                                    image: companion.image,
                                    online: companion.online,
                                })
                            }

                            if (conversation.participants.some(p => p.toString() === users[k] && users[k] === companionId)) {
                                req.io.to(k).emit('CONVERSATION_RECEIVE', {
                                    _id: conversation._id,
                                    messages: [],
                                    title: author.nickname,
                                    image: author.image,
                                    online: author.online,
                                })
                            }
                        });
                        return conversation;
                    })
            }
            return conversation;
        })
        .then((conversation) => {
            console.log(3, conversation._id);
            return Messages.create({
                conversationId: conversation._id,
                author: authorId,
                text,
                available: conversation.participants,
            })
        })
        .then((message) => {
            return res.status(200).json(message)
        })
});

/**
 * route http://localhost:5000/messages/removeById'
 * For removing message by id
 * @param req.userId {String} - User's id which want to remove message
 * @param req.body.messageId {String} - Message's id
 */
router.put('/removeById', checkAuth, (req, res) => {
    const { userId } = req;
    const { messageId } = req.body;
    console.log(messageId);
    Messages.findOneAndUpdate(
        { _id: messageId },
        { $pull: { available: userId } },
    )
        .then((message) => {
            console.log(message);
            return res.status(200).json(message)
        })
});

/**
 * route http://localhost:5000/messages/removeMessages'
 * For removing array of messages
 * @param req.userId {String} - User's id which want to remove messages
 * @param req.body.messages {Array} - Array of messages' ids
 */
router.put('/removeMessages', checkAuth, (req, res) => {
    const { userId } = req;
    const { messages } = req.body;
    Messages.updateMany(
        { _id: {$in: messages} },
        { $pull: { available: userId } },
    )
        .then((messages) => {
            return res.status(200).json(messages)
        })
});

/**
 * route http://localhost:5000/messages/removeAllMessages'
 * For removing all messages by conversation Id
 * @param req.userId {String} - User's id which want to remove messages
 * @param req.body.conversationId {String} - Conversation's id
 */
router.put('/removeAllMessages', checkAuth, (req, res) => {
    const { userId } = req;
    const { conversationId } = req.body;
    Messages.updateMany(
        { conversationId },
        { $pull: { available: userId } },
        { new: true }
    )
        .then((messages) => res.status(200).send({ id: conversationId}))
});


module.exports = router;