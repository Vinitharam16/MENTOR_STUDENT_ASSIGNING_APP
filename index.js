const express = require('express');
const HTTP_SERVER = express();
const cors = require('cors');
const bodyparser = require('body-parser');
const { connectToDatabase } = require('./database/dbconfig');
//ENABLING CORS
HTTP_SERVER.use(cors());

//Initializing connection with database
connectToDatabase();

//configure the server to accept JSON
HTTP_SERVER.use(bodyparser.json());


//DEFINING AND LISTENING TO PORT WITH EXPRESS SERVER
const PORT = 5000;
HTTP_SERVER.listen(PORT,()=>{
    console.log("Server started Successfully"+PORT);
});

HTTP_SERVER.use("/api/mentors", require("./controllers/mentor.controller"));

HTTP_SERVER.use("/api/students", require("./controllers/student.controller"));