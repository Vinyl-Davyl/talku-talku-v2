const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");
const app = express();
const socket = require("socket.io");
require("dotenv").config();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000", "https://talku-talku-v2.vercel.app", "https://talku-talku-v2-3stsevwfy-vinyl-davyl.vercel.app", "https://talku-talku-v2-server.vercel.app");
    res.header("Content-Type", "application/json");
    next();
  });

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

const server = app.listen(process.env.PORT, () =>
  console.log(`Speak Lord! Your server is listening on port ${process.env.PORT}`)
);
const io = socket(server, {
  cors: {
    origin: ["http://localhost:3000", "https://talku-talku-v2.vercel.app", "https://talku-talku-v2-3stsevwfy-vinyl-davyl.vercel.app", "https://talku-talku-v2-server.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["talku-header"],
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});
