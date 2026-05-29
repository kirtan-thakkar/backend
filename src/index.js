import WebSocket, { WebSocketServer } from "ws";
import http from "http";

const server = http.createServer((req, res) => {
  console.log(new Date() + " Received request for " + req.url);
  res.end("Hi there from hhtp request mother fucker!");
});

const wss = new WebSocketServer({ server }); //websocket server

wss.on("connection", function connection(socket) {
  socket.on("error", console.error);

  socket.on("message", function message(data, isBinary) { // when receive a message 
    wss.clients.forEach(function each(client) { // broadcast it to every client connected to the server
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });

  socket.send("Hi there from websocket server mother fucker!");
});

server.listen(8080, () => {
  console.log(new Date() + " Server is listening on port 8080");
});
