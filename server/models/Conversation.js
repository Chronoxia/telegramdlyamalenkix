const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConversationSchema = new Schema({
    title: {
        type: String,
    },
    participants: [{ type: Schema.Types.ObjectId, ref: 'User'}],
    messagesLists: [{ type: Schema.Types.ObjectId, ref: 'MessageList'}],
});

module.exports = mongoose.model('Conversation', ConversationSchema);