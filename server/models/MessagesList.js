const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessagesListSchema = new Schema({
    conversationId:{ type: Schema.Types.ObjectId, ref: 'Conversation'},
    userId: { type: Schema.Types.ObjectId, ref: 'User'},
    messages: [{ type: Schema.Types.ObjectId, ref: 'Message'}],
});

module.exports = mongoose.model('MessagesList', MessagesListSchema);