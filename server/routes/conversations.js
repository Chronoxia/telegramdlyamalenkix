const express = require('express');
const bodyParser = require('body-parser');

const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const checkAuth = require('../middlewares/auth/checkAuth');

const router = express.Router();

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

/**
 * route http://localhost:5000/conversations'
 * For getting all user's conversations
 * @param req.userId {String} - User's id
 */

router.get('/',checkAuth, (req, res) => {
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
                let { title, _id, participants, image } = conversation;
                if(!title) {
                    const indexOfUser = participants.map((user) => user._id.toString()).indexOf(userId.toString());
                    const companion = participants.filter((item, index) => index !== indexOfUser)[0];
                    title = companion.nickname;
                    image = companion.image;
                }
                Message.find({ conversationId: _id, available: userId} )
                    .populate({
                        path: 'user',
                        select: 'nickname'
                    })
                    .then((messages) => {
                        fullConversations[_id] = {lastMessages: messages, title, id: _id, image };
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
    const { participants, title } = req.body;
    const { userId } = req;
    User.find({_id: {$in: participants}})
        .then((users) => Conversation.create({
            participants: users.map((user) => user._id),
            title
        }))
        .then(c => Message.find({ conversationId: c._id, available: userId}).then(messages => {
            return {
                title: c.title,
                id: c._id,
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
    Conversation.findOne({ participants: [userId, companionId]})
        .then((conversation) =>{console.log(conversation); return res.status(200).json(conversation)})
        .catch((err) => console.log(err));

});

module.exports = router;