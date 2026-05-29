import express from 'express';
import { WebSocketServer, WebSocket } from 'ws';

const app = express();
app.get('/', (req, res) => {
    console.log((new Date()) + " Received request for " + req.url);
    res.end("Hi there from http request!");
});
const httpserver = app.listen(8080,(req,res)=>{
    console.log((new Date()) + " Server is listening on port 8080");
});

const wss = new WebSocketServer({ server: httpserver }); 

wss.on("connection", function connection(socket){
    socket.on("error", (error)=>console.error(error));

    socket.on("message", function message(data,isBinary){
        wss.clients.forEach(function each(client){
            if(client.readyState === WebSocket.OPEN){
                client.send(data, {binary: isBinary});
            }
        })

    // socket.send("Hi there from websocket server!");
        
    })
})
