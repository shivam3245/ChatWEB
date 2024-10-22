import { Server } from "socket.io";
import http from 'http'
import express from 'express'

const app=express()
const onlineUsers={}

const server=http.createServer(app)
const io=new Server(server, {
    cors:{
        origin:"*",
        methods:['GET',"POST"]
    }
})
export const GetReceiverSocketId=(receiverId)=>{
    return onlineUsers[receiverId]
}

io.on("connection", (socket)=> {
    console.log("user joined", socket.id)
    socket.on('join', (receiverId)=>{ ///assignnig a key to the user whenever a new socket(user)joins
     onlineUsers[receiverId]=socket.id
     console.log("Receiver: ", receiverId, "socket id: ", socket.id)
    })
})

export {server,app,io}