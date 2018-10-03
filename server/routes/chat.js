const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
// router.use(bodyParser.urlencoded({extended: false}));
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

router.get('/searchUsers/:input',  checkAuth, (req, res) => {
    const { input } = req.params;
    const pattern = `^${input}`;
    User.find({email:{$regex: pattern}})
        .select('-password')
        .then((users) => res.status(200).json(users))
        .catch((err) => console.log(err))
});

router.get('/conversations',checkAuth, (req, res) => {
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
                let { title, _id, participants } = conversation;
                if(!title) {
                    const indexOfUser = participants.map((user) => user._id.toString()).indexOf(userId.toString());
                    const companion = participants.filter((item, index) => index !== indexOfUser)[0];
                    title = companion.nickname
                }
                Message.find({ conversationId: _id, available: userId} )
                    .populate({
                        path: 'user',
                        select: 'nickname'
                    })
                    .then((messages) => {
                        fullConversations[_id] = {lastMessages: messages, title, id: _id };
                        if (Object.keys(fullConversations).length === conversations.length) {
                            // console.log(fullConversations);
                            return res.status(200).json({ conversations: fullConversations });
                        }
                    })
            });
        })
        .catch((err) => console.log(err))
});

router.post('/conversation', checkAuth, (req, res) => {
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

router.get('/conversation/:companionId', checkAuth, (req, res) => {
    const { userId } = req;
    const { companionId } = req.params;
    Conversation.findOne({ participants: {$in: [ [userId, companionId], [companionId, userId] ]} })
        .then((conversation) =>{console.log(conversation); return res.status(200).json(conversation)})
        .catch((err) => console.log(err));

});

router.post('/message', checkAuth, (req, res) => {
    const { text, conversationId, authorId } = req.body;
    Conversation.findById(conversationId)
        .then((conversation) => {
            if(!conversation) {
                const { companionId } = req.body;
                return Conversation.create({
                    participants: [authorId, companionId]
                })
            }
            return conversation;
        })
        .then((conversation) => (
            Message.create({
                conversationId: conversation._id,
                author: authorId,
                text,
                available: conversation.participants,
            })
        ))
        .then((message) => {
            return res.status(200).json(message)
        })

});

router.put('/removeMessage/:messageId', checkAuth, (req, res) => {
    const { userId } = req;
    const { messageId } = req.params;
    Message.findOneAndUpdate(
        { _id: messageId },
        { $pull: { available: userId } },
    )
        .then((message) => {
            return res.status(200).json(message)
        })
});

router.put('/removeMessages', checkAuth, (req, res) => {
    const { userId } = req;
    const { messages } = req.body;
    Message.updateMany(
        { _id: {$in: messages} },
        { $pull: { available: userId } },
    )
        .then((messages) => {
        return res.status(200).json(messages)
    })
});

router.put('/removeAllMessages', checkAuth, (req, res) => {
    const { userId } = req;
    const { conversationId } = req.body;
    Message.updateMany(
        { conversationId },
        { $pull: { available: userId } },
    )
        .then((messages) => {
        return res.status(200).json(messages)
    })
});


module.exports = router;