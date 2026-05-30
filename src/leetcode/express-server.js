import express from "express";
import { Redis } from '@upstash/redis'
const redis = new Redis({
  url: 'https://tough-duckling-95635.upstash.io',
  token: 'gQAAAAAAAXWTAAIgcDI4YTczNTMxMTFkYmE0YjBhOGU1N2VhYjhjMjUwNjg5NQ'
})

const app = express();
app.use(express.json());


app.listen(8080, () => {
  console.log(
    "Server is listening on port 8080 at",
    new Date()
  );
});

app.post("/submit", async (req, res) => {
  // this guy id publishing the message to the queue and the worker will be consuming it.
  const { problemId, userid, code, language } = req.body;
  //ideally push this to the database
  await redis.lpush(
    "Submissions",
    JSON.stringify({
      problemId,
      userid,
      code,
      language,
      timestamp: new Date(),
    }),
    
  ); /// here the "Submissions" is basically you can say the name of the queue and the other is the payload that we are getting from the user.
  res.json({
    message: "Submission received successfully!",
 
  });
});
// async function startServer() {
//   try {
//     await redis.connect();
//         app.listen(8080,(req,res)=>{
//             res.send("Server is listening on port 8080 on" + (new Date()));
//         })
//   } catch (error) {
//     console.error(error.message);
//   }
// }

// startServer();
