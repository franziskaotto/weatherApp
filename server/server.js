
const express = require('express');
const path = require('path');



const server = express();
server.use(express.json());


server.use(express.static(path.join(__dirname, "client", "public")));


const PORT = 8080;

server.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Handle requests to the root URL
server.get("/", (req, res) => {
  res.send("Hello");
});

server.listen(PORT, () => {
  console.log(`server is listening on Port http://localhost:${PORT}`);
})
