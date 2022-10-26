
const express = require('express');
const cors = require('cors')
require('dotenv').config();
const {dbConnection} = require('./database/config');

//create server express
const app = express();
//CORS
app.use(cors())
//PUBLIC FOLDER
app.use(express.static('public'));
//Red and parser body
app.use(express.json());
//Database
dbConnection();
// console.log(process.env);
//Routes
app.use('/api/users',require('./routes/user.routes'));
app.use('/api/login',require('./routes/auth.routes'));
app.use('/api/hospitals',require('./routes/hospital.routes'));
app.use('/api/doctors',require('./routes/doctor.routes'));
app.use('/api/search',require('./routes/search.routes'));
app.use('/api/uploads', require('./routes/upload.routes'));


app.listen(process.env.PORT, ()=>{
    console.log("Server runing on port" + process.env.PORT);
})