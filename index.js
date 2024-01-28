const express = require('express');
const HTTP_SERVER = express();
const cors = require('cors');
const bodyparser = require('body-parser');
const { connectToDatabase } = require('./database/dbconfig');


var whitelist = [
    "http://127.0.0.1:5500",
    undefined,
    "https://student-mentor-app.onrender.com/",
  ];
  var corsOptions = {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  };

//ENABLING CORS
HTTP_SERVER.use(cors(corsOptions));

//configuring dotenv package
require("dotenv").config();

//Initializing connection with database
connectToDatabase();

//configure the server to accept JSON
HTTP_SERVER.use(bodyparser.json());


//DEFINING AND LISTENING TO PORT WITH EXPRESS SERVER
// const PORT = 5000;
// HTTP_SERVER.listen(PORT,()=>{
//     console.log("Server started Successfully"+PORT);
// });

const PORT = process.env.DEV_SERVER_PORT;
HTTP_SERVER.listen(PORT, process.env.NODE_HOSTNAME, () => {
  console.log("Server started successfully!");
});

HTTP_SERVER.use("/api/mentors", require("./controllers/mentor.controller"));

HTTP_SERVER.use("/api/students", require("./controllers/student.controller"));