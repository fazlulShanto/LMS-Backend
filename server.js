// console.clear()
require('./resources/clearConsole');
require('dotenv').config();
const cors = require('cors');
const Express = require('express');
const path = require('path');
const fs = require('fs');
const app  = Express();
app.use(cors());

//static contents 
app.use(Express.static('uploads'));


app.use(Express.json({limit: '500mb'}));
// app.use(Express.urlencoded({limit: '50mb'}));
app.use(Express.urlencoded({ extended: true }));
const _Config = require('./config.json');
const {connectDb} = require('./api/db/db');

const _PORT = _Config.todo.port;
const api = _Config.todo.apiLink;

//routes

const todoRoute = require('./api/routes/todoRoute');
const mailRoute = require('./api/routes/mailRoute');
const userRoute = require('./api/routes/userRoute');
const authRoute = require('./api/routes/authRoute');
const uploadRoute = require('./api/routes/uploadRoute');
const courseRoute = require('./api/routes/courseRoute');


// app.use(Express.json());

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });
//api root



app.get('/',(req,res)=>{
    res.send({message : "LMS api Root"})
})

// app.use('/api/user',require('./api/routes/userRoute'));

app.use('/api/todo',todoRoute);
app.use('/api/mail',mailRoute);
app.use('/api/user',userRoute);
app.use('/api/auth',authRoute);
app.use('/api/upload',uploadRoute);
app.use('/api/course',courseRoute);


connectDb();// start the DB connection
app.listen(_PORT,()=>{
    console.log(`Backend server is running at http://localhost:${_PORT}`)
});