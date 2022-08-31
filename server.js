// console.clear()
require('./resources/clearConsole');

const Express = require('express');
const app  = Express();
const _Config = require('./config.json');
const {connectDb} = require('./api/db/db');

const _PORT = _Config.todo.port;
const api = _Config.todo.apiLink;

//routes

const todoRoute = require('./api/routes/todoRoute');

app.use(Express.json());
//api root

app.get('/',(req,res)=>{
    res.send({message : "LMS api Root"})
})

// app.use('/api/user',require('./api/routes/userRoute'));

app.use('/api/todo',todoRoute);

connectDb();// start the DB connection
app.listen(_PORT,()=>{
    console.log(`Backend server is running at http://localhost:${_PORT}`)
});

