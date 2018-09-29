let clients = [];

const socketConfiguration = socket => {
    console.log("User connected");
    socket.emit('USER_JOIN');

    socket.on('disconnect', () => {
        socket.emit('USER_LEAVE');
        console.log('user disconnected');
    });
    socket.on('MESSAGE_ADD', (message) => {
        socket.broadcast.emit(`MESSAGE_RECIVED`, message)
    });
    socket.on('USER_JOIN', (userId) => {
    });
    socket.on('USER_LEAVE', (userId) => {

    })
};

module.exports = socketConfiguration;