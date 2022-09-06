// console.clear()
require('./resources/clearConsole');
require('dotenv').config();
const cors = require('cors');
const Express = require('express');
const app  = Express();
const _Config = require('./config.json');
const {connectDb} = require('./api/db/db');

const _PORT = _Config.todo.port;
const api = _Config.todo.apiLink;

//routes

const todoRoute = require('./api/routes/todoRoute');
const mailRoute = require('./api/routes/mailRoute');
const userRoute = require('./api/routes/userRoute');

app.use(cors());
app.use(Express.json());

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


connectDb();// start the DB connection
app.listen(_PORT,()=>{
    console.log(`Backend server is running at http://localhost:${_PORT}`)
});
