import { Redis } from '@upstash/redis'  
const redis = new Redis({
  url: 'https://tough-duckling-95635.upstash.io',
  token: 'gQAAAAAAAXWTAAIgcDI4YTczNTMxMTFkYmE0YjBhOGU1N2VhYjhjMjUwNjg5NQ'
})

// the job of the workker is to continoulsy poll the queue and check if there is something and if there is something then it will process that and then pop that message from the queue and then publish the result to the pub sub from where the websocket servers are going to be connected and from there the websocket servers are going to subscribe to the pu sub and then they are going to send the result to the respective user.

async function main(){
    while(1){
        // const response = await redis.brpop("Submissions", 0); // here we are doing brpop which is basically blocking right pop so it will wait until there is something in the queue and then it will pop that message from the queue and then it will return that message to us.

        const response  = await redis.rpop("Submissions")

        await new Promise((resolve)=>setTimeout(resolve,1000)) 
        //ideally here send it to pubsub

        console.log("Processing submission: ", response);
    }
}

main();