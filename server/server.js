const http=require("http");
const express=require("express");
const cors=require("cors");
const socketio=require("socket.io");


const app=express();
const users=[{}];

app.get('/',(req,res)=>{
    res.send("Hello world");
})

app.use(cors());
const server=http.createServer(app);
const port= 1900||process.env.PORT;
const io=socketio(server);


io.on('connection',(socket)=>{
    console.log("new connection");

    socket.on("joined" , ({user})=>{
        users[socket.id]=user;
        console.log(`${user} had joined`);
        socket.broadcast.emit('user joined',{user:'admin',message:`${users[socket.id]} had joined`})
        socket.emit('welcome',{user:'admin',message:`welcome to the chat ${users[socket.id]}`})
    })

    socket.on('message',({message,id})=>{
        io.emit('sendMessage',{user:users[id],message,id});
    })

    socket.on('disconnect',()=>{
        socket.broadcast.emit('leave',{user:'admin',message:`${users[socket.id]} had left the chat`})
        console.log("user left");
    })

});

server.listen(port,()=>{
    console.log(`server is working on ${port}`);
});