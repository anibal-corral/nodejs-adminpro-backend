
const express = require('express');
const cors = require('cors')
require('dotenv').config();
const {dbConnection} = require('./database/config');

//create server express
const app = express();
//CORS
app.use(cors())
//Red and parser body
app.use(express.json());
//Database
dbConnection();
// console.log(process.env);
//Routes
app.use('/api/users',require('./routes/user.routes'));


app.listen(process.env.PORT, ()=>{
    console.log("Server runing on port" + process.env.PORT);
})