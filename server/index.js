const express = require("express");
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const AuthController = require('./routes/auth');
const UsersController = require('./routes/users');
const ConversationsController = require('./routes/conversations');
const MessagesController = require('./routes/messages');
const User = require('./models/User');
const handleToken = require('./middlewares/auth/handleToken');

const corsOptions = {
    origin: ['http://localhost:4200', 'http://localhost:8080', 'http://localhost:8081']
};
app.use((req, res, next) => {
    req.io = io;
    next();
});
app.use(cors(corsOptions));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(handleToken);
app.use('/auth', AuthController);
app.use('/users', UsersController);
app.use('/conversations', ConversationsController);
app.use('/messages', MessagesController);

const db = require('./config/keys').mongoURI;
mongoose
    .connect(db, {useNewUrlParser: true})
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));


const port = 5000;
const users = { };

io.on('connection', socket => {
    console.log("User connected");

    socket.on('disconnect', () => {
        User.findOneAndUpdate(
            { _id: users[socket.id] },
            { $set: { online: false } },
            { new: true }).then((user) => console.log(user));
        delete users[socket.id];
    });
    socket.on('MESSAGE_ADD', (message) => {
        io.to(message.conversationId).emit(`MESSAGE_RECEIVED`, message)
    });
    socket.on('USER_JOIN', (room) => {
        socket.join(room);
    });
    socket.on('CREATE_CONVERSATION', conversation => {
        const keys = Object.keys(users);
        conversation.participants.forEach(c => {
            keys.forEach(id => {
                if (users[id] === c) {
                    io.to(id).emit('CONVERSATION_RECEIVE', conversation);
                }
            })
        })
    });
    socket.on('USER_LEAVE', (room) => {
        console.log(`left ${room}`);
        socket.leave(room);
    });
    socket.on('USER_CONNECTED', (user) => {
        users[socket.id] = user._id;
        User.findOneAndUpdate(
            { _id: user._id },
            { $set: { online: true } },
            { new: true }).then((user) => console.log(2));
    })
});

server.listen(port, () => console.log(`Server listening on port ${port}!`));

module.exports = {
    users,
};
