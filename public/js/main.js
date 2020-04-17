const chatForm = document.getElementById('chat-form')
const chatMessages = document.querySelector('.chat-messages')
const roomName = document.getElementById('room-name')
const userList   = document.getElementById('users')

//Get user name and room from URL
const {username,room}= Qs.parse(location.search ,{
        ignoreQueryPrefix :true 
})


console.log(username,room)
//Message from server

const socket = io()

//Join the chat room

socket.emit('joinRoom',{
    username,room
})

//Get room and Users
socket.on('roomUsers',({room,users})=>{
    outputRoomName(room)
    outputUsers(users)
})
 socket.on('message',(message)=>{
     console.log(message)
     outputMessage(message)

     //Scrolldown for the new Message
     chatMessages.scrollTop= chatMessages.scrollHeight
 })

 chatForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    //Get message text
    const msg = e.target.elements.msg.value
    //EMit message to server
    socket.emit('chatMessage',msg)

    e.target.elements.message.value=''
    e.target.elements.message.focus()
 })
 //output msg to dom

 function outputMessage(message){
     const div = document.createElement('div')
     div.classList.add('message')
     div.innerHTML=`	<p class="meta">${message.username} <span>${message.time}</span></p>
     <p class="text">
         ${message.text}
     </p>`;
     document.querySelector('.chat-messages').appendChild(div)
 }

 //add room name to dom
 function outputRoomName(room){
     roomName.innerText = room
 }

 //add users to dom
 function outputUsers(userList){
     
     
 }