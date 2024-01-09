import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import { PrismaClient } from "@prisma/client";
import router from "./routes";
import { Server } from "socket.io";

const prisma = new PrismaClient()

const app = express();
dotenv.config();

const { port } = process.env

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
  socket.on('join', (room) => {
    console.log(room);
    socket.join(room.room)
    console.log("vào phòng thành công");

    socket.on('send', (data) => {
      console.log(data);
      console.log(room.room);
      socket.to(room.room).emit('newMess', data)
      console.log('gửi thành công');
    })
  })



  socket.on('disconnect', () => {
    console.log('A user disconnected', socket.id);
  });
});



app.listen(port, () => {
  console.log(`server is running on port ${port}`);
})







