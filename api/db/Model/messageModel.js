const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
    {
        chatid:{
            type : String
        },
        senderid : {
            type:String
        },
        text:{
            type : String
        }
    },{
        timestamps:true
    }
);

module.exports = mongoose.model('message', messageSchema);