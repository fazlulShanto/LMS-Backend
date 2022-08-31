const mongoose = require('mongoose');
const config = require("../../config.json");
const connectDb = ()=>{

    const {url1,url2,url3} = config.db;
    mongoose.connect(url2).then(()=>console.log(`connected to DB`)).catch(err => console.log(err));
};
module.exports = {connectDb};