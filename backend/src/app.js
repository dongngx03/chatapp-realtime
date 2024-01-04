import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import { PrismaClient } from "@prisma/client";
import router from "./routes"; 
import { Server } from "socket.io";

const prisma = new PrismaClient()

const app  = express();
dotenv.config();

const {port} = process.env

app.use(express.json());
app.use(cors());
app.use('/api', router)

const io = new Server(8000, {
    path: '/socket.io',
    cors: {
      origin: "http://localhost:5173", 
      methods: ["GET", "POST"]
    }
});

// xủa lý soket
io.on("connection", (socket) => {
    console.log("A user connected", socket.id);
    socket.on('join', (mess, id, room) => {
      console.log(room, id, mess);
      socket.join(room)
  
      socket.on('two', (data) => {
        console.log({data});
        socket.to(room).emit('newMess', data)
      })
    })
  
    
    socket.on('disconnect', () => {
      console.log('A user disconnected', socket.id);
    });
});



app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})







