"use strict";
exports.__esModule = true;
var PORT = 3000 || process.env.PORT;
//Access
var express = require("express");
// import{path} from 'path'
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var messages_1 = require("./utils/messages");
var users_1 = require("./utils/users");
server.listen(PORT, function () {
    console.log("server running at " + PORT);
});
//app.use(express.static(path.join(__dirname,'public')))
app.use(express.static('public'));
var botName = 'ChatBot';
io.on('connection', function (socket) {
    console.log("connected " + socket.id);
    socket.on('joinRoom', function (_a) {
        var username = _a.username, room = _a.room;
        var user = users_1.userJoin(socket.id, username, room);
        socket.join(user.room);
        //everyone
        socket.emit('message', messages_1.formatMessage(botName, 'Welcome to chat app'));
        //Broadcast
        socket.broadcast.to(user.room).emit('message', messages_1.formatMessage(botName, user.username + " has joined the chat"));
        //Send user and room info
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: users_1.getRoomUsers(user.room)
        });
    });
    //Listen for the message
    socket.on('chatMessage', function (msg) {
        var user = users_1.getCurrentUser(socket.id);
        io.to(user.room).emit('message', messages_1.formatMessage(user.username, msg));
    });
    //Disconnectioon of any useer
    socket.on('disconnect', function () {
        var user = users_1.userLeave(socket.id);
        if (user) {
            io.to(user.room).emit('message', messages_1.formatMessage(botName, user.username + " has left the chat"));
        }
        //Send user and room info
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: users_1.getRoomUsers(user.room)
        });
    });
});
