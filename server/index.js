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

io.on('connection', socket => {
    console.log("User connected");

    socket.on('disconnect', () => {
        socket.emit('USER_LEAVE');
        console.log('user disconnected');
    });
    socket.on('MESSAGE_ADD', (message) => {
        console.log(message);
        io.to(message.conversationId).emit(`MESSAGE_RECEIVED`, message)
    });
    socket.on('USER_JOIN', (room) => {
        console.log(1);
        console.log(`joined ${room}`);
        socket.join(room);
    });
    socket.on('USER_LEAVE', (room) => {
        console.log(`left ${room}`);
        socket.leave(room);
    })
    socket.on('USER_CONNECTED', (user) => {
        socket.emit('USER_CONNECTED', user)
    })
});

server.listen(port, () => console.log(`Server listening on port ${port}!`));
