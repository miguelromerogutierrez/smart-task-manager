const dotenv = require("dotenv")
dotenv.config()

const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const { chatBot } = require("./translator");

const app = express();

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://127.0.0.1:5173",
  }
});

io.on("connection", (socket) => {
  socket.on("message", (message) => {
    chatBot(message).then((response) => {
      io.emit("message", response.data);
    });
  })
});

httpServer.listen(4000);