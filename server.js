// console.clear()
require('./resources/clearConsole');
require('dotenv').config({
    path:'./.env'
});
const cors = require('cors');
const Express = require('express');
const http = require('http');
const {Server} = require('socket.io');
const cookieParser = require('cookie-parser');
const path = require('path');
const fs = require('fs');
const app  = Express();
const _Config = require('./config.json');
const {connectDb} = require('./api/db/db');

//middlewares
const {verifyJWT} = require('./api/middleware/verifyJWT');
const corsOption = require('./api/middleware/coresOption');

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Credentials',true);
    
    // console.log(res.getHeaders())
    next();
})
app.use(cors({origin:true, credentials:true}));
app.use(Express.static('uploads'));//static contents 
app.use(Express.urlencoded({ extended: false }));
app.use(Express.json({limit: '500mb'}));
app.use(cookieParser());
// app.use(Express.urlencoded({limit: '50mb'}));


const _PORT = _Config.todo.port;
const api = _Config.todo.apiLink;

//routes

const todoRoute = require('./api/routes/todoRoute');
const mailRoute = require('./api/routes/mailRoute');
const userRoute = require('./api/routes/userRoute');
const authRoute = require('./api/routes/authRoute');
const uploadRoute = require('./api/routes/uploadRoute');
const courseRoute = require('./api/routes/courseRoute');
const taskRoute = require('./api/routes/taskRoute');
const registrationRoute = require('./api/routes/regsitrationRoute')
const refreshRoute = require('./api/routes/refreshRoute')
const logoutRoute = require('./api/routes/logoutRoute')
const adminRoute = require('./api/routes/adminRoute')
const teacherRoute = require('./api/routes/teacherRoute')
const chatRoute = require('./api/routes/chatRoute');
const messageRoute = require('./api/routes/messageRoute');
const shceduleRoute = require('./api/routes/ScheduleRoute');


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

app.use('/api/register',registrationRoute);
app.use('/api/auth',authRoute);
app.use('/api/refresh',refreshRoute);
app.use('/api/logout',logoutRoute);
app.use('/api/admin',adminRoute);
// secured routes
// app.use(verifyJWT);

app.use('/api/todo',todoRoute);
app.use('/api/user/teacher',teacherRoute);
app.use('/api/mail',mailRoute);
app.use('/api/user',userRoute);
app.use('/api/upload',uploadRoute);
app.use('/api/course',courseRoute);
app.use('/api/task',taskRoute);
app.use('/api/chat',chatRoute);
app.use('/api/message',messageRoute);
app.use('/api/schedule',shceduleRoute);


connectDb();// start the DB connection


const server = http.createServer(app);

const io = new Server(server,{
    cors:{
        origin:"*"
    }
});
let activeUsers = [];
io.on('connection', (socket) => {
 
    // register a user
    socket.on('new-user-add',(userid)=>{
        //find if the user already in the list

        if(! activeUsers.find(v => v.userid == userid)){
            activeUsers.push({
                userid:userid,
                socketid : socket.id
            });
        }
        // console.log(`Connected users:`,activeUsers);
    
        io.emit('get-users',activeUsers);

    });
    //on new message  send

    socket.on('send-message',(data)=>{
        const {receiverid} = data;
        const user = activeUsers.find( u => u.userid == receiverid);
        // console.log('data',data);
        // console.log('sending from ',receiverid);
        if(user){
            io.to(user.socketid).emit('receive-message',data);
        }
    })

    //on disconnect an user
    socket.on("disconnect", (reason) => {
        // ...
        activeUsers = activeUsers.filter(v => v.socketid !== socket.id);
        // console.log('disconnected '+ socket.id);
        // console.log(`Connected users:`,activeUsers);
      });
  
  });


server.listen(_PORT,()=>{
    console.log(`Backend server is running at http://localhost:${_PORT}`)
});