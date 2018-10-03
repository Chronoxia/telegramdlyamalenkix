const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    nickname: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
        min: 8
    },
    image: {
        type: String,
        require: true,
    }
});

module.exports = mongoose.model('User', UserSchema);