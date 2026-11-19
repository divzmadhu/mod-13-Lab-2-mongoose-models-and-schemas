// 1.1 Load environment variables from the .env file into process.env
import 'dotenv/config';
// 1.2 Import Express to create the web server and handle HTTP routes
import express from 'express';
//1.3 import  from connection.js
import connectDB from './db/connection.js';

// 2.1 Create the Express application instance
const app = express();
// 2.2 Set the port number the server will listen on
const port = 3000;

const startServer = async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}


app.get("/", (req, res) => {
  res.send("Server is started and running.");
  console.log("Server is started and running");
});


// Start the application
startServer();
