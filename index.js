
const express = require('express');
const cors = require('cors')
require('dotenv').config();
const {dbConnection} = require('./database/config');

//create server express
const app = express();
//CORS
app.use(cors())
//Database
dbConnection();
// console.log(process.env);
//Routes
app.get('/',(req, res)=>{

    res.json({
        ok:true,
        msg:'Hello world'
    })

    }
);

app.listen(process.env.PORT, ()=>{
    console.log("Server runing on port" + process.env.PORT);
})