import WebSocket, {WebSockerServer} from "ws";
import http from "http";

const server = http.createServer((req,res)=>{
    console.log((new Date()) + " Received request for " + req.url);
    res.end("Hi there from hhtp request mother fucker!")
})

const wss = new WebSockerServer({server});

wss.on("connection",function connection(ws){
    ws.on("error",console.error);

    ws.on("message",function message(data, isBinay){
        if(client.readyState === WebSocket.OPEN){
            client.send(data , {binary : isBinary});
        }


    })

    ws.send("Hi there from websocket server mother fucker!");
})

server.listen(8080,()=>{
    console.log((new Date()) + " Server is listening on port 8080");
})