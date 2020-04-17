"use strict";
exports.__esModule = true;
var users = [];
//Joining users to chat
function userJoin(id, username, room) {
    var user = { id: id, username: username, room: room };
    users.push(user);
    return user;
}
exports.userJoin = userJoin;
//Get the currrent User
function getCurrentUser(id) {
    return users.find(function (user) { return user.id === id; });
}
exports.getCurrentUser = getCurrentUser;
//User leaves  A chat
function userLeave(id) {
    var index = users.findIndex(function (user) { return user.id === id; });
    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
}
exports.userLeave = userLeave;
//Get room users
function getRoomUsers(room) {
    return users.filter(function (user) { return user.room === room; });
}
exports.getRoomUsers = getRoomUsers;
// module.exports = {
//     userJoin,
//     getCurrentUser,
//     userLeave,
//     getRoomUsers
// }
