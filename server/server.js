const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

var {generateMessage} = require('./utils/message');

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    // send only to me when i join
    socket.emit('newMessage', generateMessage({
        from: 'Admin',
        text: 'Welcome to chat!'
    }));

    // send to everyone except me
    socket.broadcast.emit('newMessage', generateMessage({
        from: 'Admin',
        text: 'New user joined'
    }));

    socket.on('createMessage', (message) => {
        io.emit('newMessage', generateMessage({
            from: message.from,
            text: message.text
        }));
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server is up on ${port}`);
});
