const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    conversationId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    available: [{type: Schema.Types.ObjectId, ref: 'User'}]
},
{
    timestamps: true
});
module.exports = mongoose.model('Message', MessageSchema);