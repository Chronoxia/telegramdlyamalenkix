const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConversationSchema = new Schema({
    title: {
        type: String,
    },
    image: {
        type: String,
    },
    author: { type: Schema.Types.ObjectId, ref: 'User'},
    participants: [{ type: Schema.Types.ObjectId, ref: 'User'}],
});

module.exports = mongoose.model('Conversation', ConversationSchema);