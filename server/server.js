
const express = require('express');
const path = require('path');
const cors = require("cors");



const server = express();
server.use(express.json())
server.use(cors());



// server.use(express.static("client"));

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


server.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Handle requests to the root URL
server.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "../../client/index.html"));
});

server.get("/script.js", (req, res) => {
  res.sendFile(path.join(__dirname + "../../client/script.js"));
});

server.get("/style.css", (req, res) => {
  res.sendFile(path.join(__dirname + "../../client/style.css"));
});

server.listen(PORT, () => {
  console.log(`server is listening on Port http://127.0.0.1:${PORT}/`);
})


