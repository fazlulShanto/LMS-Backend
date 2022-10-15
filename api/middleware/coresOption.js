const alowedOrigins = [
    'http://127:0:0:1:5500',
    'http://localhost:5500',
];

const corsOptions = {
    origin:(origin,callback)=>{

        callback(null,true);
    },
    optionsSuccessStatus:200,
    credentials: true,
}

module.exports = corsOptions;