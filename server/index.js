const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const AuthController = require('./routes/auth');
const ChatController = require('./routes/chat');

const handleToken = require('./middlewares/auth/handleToken');

const socketCofiguration = require('./socketConfiguration');

const corsOptions = {
    origin: ['http://localhost:4200', 'http://localhost:8080']
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;
mongoose
    .connect(db, {useNewUrlParser: true})
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));


app.use(handleToken);
app.use('/api/auth', AuthController);
app.use('/chat', ChatController);


const port = 5000;
// socketId: userId
const users = { };

io.on('connection', socket => {
    console.log("User connected");

    socket.on('disconnect', () => {
        delete users[socket.id];
    });
    socket.on('MESSAGE_ADD', (message) => {
        io.to(message.conversationId).emit(`MESSAGE_RECEIVED`, message)
    });
    socket.on('USER_JOIN', (room) => {
        // console.log(`joined ${room}`);
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

        // conversation.participants.forEach(c => {
        //     if (keys.some(id => users[id] === c)) {
        //         console.log(socket.id)
        //         socket.to(socket.id).emit('CONVERSATION_RECEIVE', conversation);
        //     }
        // })
    })
    socket.on('USER_LEAVE', (room) => {
        console.log(`left ${room}`);
        socket.leave(room);
    })
    socket.on('USER_CONNECTED', (user) => {
        users[socket.id] = user._id;
    })
});

server.listen(port, () => console.log(`Server listening on port ${port}!`));
