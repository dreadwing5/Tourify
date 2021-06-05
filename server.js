const express = require("express");

const server = express();

server.get("/", (req, res) => {
  res.status(200).res.send("Hello from the server side!");
});

const port = 3000;
server.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
