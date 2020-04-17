const users:any = []

//Joining users to chat

export function userJoin(id:string,username:string,room:string){
    const user = {id,username,room}
    users.push(user)
    return user
}

//Get the currrent User
export function getCurrentUser(id):any{
    return users.find(user=>user.id===id)
}

//User leaves  A chat
export function userLeave(id):any{
    const index:any = users.findIndex(user=>user.id === id)

    if(index!== -1){
    return users.splice(index,1)[0]
    } 
}

//Get room users
export function getRoomUsers(room):any{
return users.filter(user=>user.room === room)
}

// module.exports = {
//     userJoin,
//     getCurrentUser,
//     userLeave,
//     getRoomUsers
// }