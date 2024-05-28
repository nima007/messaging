import express from 'express';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();

const corsOptions = {
    origin: 'http://192.168.1.196:5173',
    // origin: 'http://localhost:5173',
    // origin: 'http://localhost:5173',
    // origin:'https://crd.liara.run',
    credentials: true,
    optionSuccessStatus: 200
}
app.use(cors());
let usersConnections_map = new Map();
let server = app.listen(3000, () => console.log("listening on 3000"))
const io = new Server(server,{cors:{
    origin:"http://192.168.1.196:5173"
}})
app.use((req, res, next) => {
    console.log("new request");
    next()
})
app.get("/", (req, res) => {
    res.send("welcome")
})
io.on("connection", (socket) => {
    console.log("user is connected");
    socket.on("disconnect", () => {
        console.log("user disconnected");
    })
    socket.on("message",(message)=>{
        console.log("new message recieved");
        console.log(message);
        bordMessage(message)
    })
})
function bordMessage({name,message}){
    io.send({
        name,
        message
    })
}