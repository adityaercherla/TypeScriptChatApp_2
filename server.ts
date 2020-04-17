const PORT:any = 3000 || process.env.PORT
//Access
import * as express from 'express'
import {IncomingMessage, ServerResponse} from 'http';
import {Stats} from 'fs';
// import{path} from 'path'
var app:any =  express();
var server:any = require('http').Server(app);
var io:any = require('socket.io')(server); 
import {formatMessage} from './utils/messages'
import {
    userJoin,
    getCurrentUser,
    getRoomUsers,
    userLeave 
  } from './utils/users'

server.listen(PORT,function(){
console.log("server running at "+PORT);

});

//app.use(express.static(path.join(__dirname,'public')))
app.use(express.static('public')) 


const botName =  'ChatBot'




io.on('connection', function (socket) {
    console.log("connected "+socket.id);
 
        socket.on('joinRoom',({username,room})=>{
            const user= userJoin(socket.id,username,room)
            socket.join(user.room)
//everyone
            socket.emit('message',formatMessage(botName,'Welcome to chat app'))
//Broadcast
      socket.broadcast.to(user.room).emit('message',formatMessage(botName,`${user.username} has joined the chat`))

      //Send user and room info
      io.to(user.room).emit('roomUsers',{
          room: user.room,
          users : getRoomUsers(user.room)
      })
        })

      

      
  
      //Listen for the message
      socket.on('chatMessage',(msg)=>{
        const user = getCurrentUser(socket.id)


          io.to(user.room).emit('message',formatMessage(user.username,msg))
      })
//Disconnectioon of any useer
      socket.on('disconnect',()=>{
          const user = userLeave(socket.id)
          if(user){
            io.to(user.room).emit('message',formatMessage(botName,`${user.username} has left the chat`))  
          }
          //Send user and room info
      io.to(user.room).emit('roomUsers',{
        room: user.room,
        users : getRoomUsers(user.room)
    })
        
    })  
});