
const express = require('express');
const path = require('path');
const cors = require("cors");

const server = express();
server.use(express.json())
server.use(cors());

server.use(
  express.static("client", {
    setHeaders: (res, path, stat) => {
      if (path.endsWith(".css")) {
        res.set("Content-Type", "text/css");
      }
      if (path.endsWith(".js")) {
        res.set("Content-Type", "text/javascript");
      }
    },
  })
);

const PORT = 8080;

server.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "../../client/index.html"));
});

server.get("/script.js", (req, res) => {
  res.sendFile(path.join(__dirname + "../../client/public/script.js"));
});

server.get("/style.css", (req, res) => {
  res.sendFile(path.join(__dirname + "../../client/public/style.css"));
});

server.get("/client/Images/herz.png", (req, res) => {
  res.sendFile(path.join(__dirname + "../../client/Images/herz.png"));
});
server.get("/client/Images/humidity.png", (req, res) => {
  res.sendFile(path.join(__dirname + "../../client/Images/humidity.png"));
});
server.get("/client/Images/wind.png", (req, res) => {
  res.sendFile(path.join(__dirname + "../../client/Images/wind.png"));
});

server.listen(PORT, () => {
  console.log(`server is listening on Port http://127.0.0.1:${PORT}/`);
})


