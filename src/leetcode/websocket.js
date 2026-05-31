import {WebSocketServer} from 'ws';
import express from 'express';
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: 'https://tough-duckling-95635.upstash.io',
  token: 'gQAAAAAAAXWTAAIgcDI4YTczNTMxMTFkYmE0YjBhOGU1N2VhYjhjMjUwNjg5NQ'
})


const app = express();
app.use(express.json());

const server = app.listen(3000);
const wss = new WebSocketServer({ server });

const users = new Map(); // this is basically to keep track of the users that are connected to the websocket server and we are going to store the user id and the socket connection in this map.




wss.on("connection", function connection(socket){
    socket.on("error", console.error);

    socket.on("message", function message(data){
        const message = JSON.parse(data.toString());

        users.set(message.userid, socket); // here we are storing the user id and the socket connection in the map so that we can send the result to the respective user when we get the result from the worker.

        console.log(`User ${parsedData.userId} connected`);

        /// now if the client sends  {userid:"123"} then the map becomes {"123":socket}

        await redis.subscribe("Results",function(message){
            const result = JSON.parse(message);

            const socket = users.get(result.userid); // here we are getting the socket connection of the user from the map using the user id that we got from the result that we got from the worker.

            if(socket){
                socket.send(
                    JSON.stringify({
                        finaloutput: result.result 
                    })
                )
            }
        })
    })
    
})