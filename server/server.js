// Dependencies
const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const mongoose = require("mongoose");

// user and room routes
const userRoutes = require("./Routes/userRoutes");
const roomRoutes = require("./Routes/roomRoutes");

// Express setup
const app = express();
app.use(cors());
app.use(express.json());
require("dotenv").config();

const server = http.createServer(app);

// Database connection and server start
mongoose
  .connect(process.env.db_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("database connected");
    server.listen(process.env.PORT, () => {
      console.log("hey server is listening on Port no - ", process.env.PORT);
    });
  });

//full user routes
app.use("/api/user", userRoutes);
app.use("/api/chat", roomRoutes);
