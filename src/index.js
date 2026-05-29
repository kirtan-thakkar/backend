import WebSocket, { WebSockerServer } from "ws";
import http from "http";

const server = http.createServer((req, res) => {
  console.log(new Date() + " Received request for " + req.url);
  res.end("Hi there from hhtp request mother fucker!");
});

const wss = new WebSockerServer({ server }); //websocker server

wss.on("connection", function connection(socket) {
  socket.on("error", console.error);

  socket.on("message", function message(data, isBinay) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });

  ws.send("Hi there from websocket server mother fucker!");
});

server.listen(8080, () => {
  console.log(new Date() + " Server is listening on port 8080");
});
