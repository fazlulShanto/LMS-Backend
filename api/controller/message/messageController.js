const messageModel = require("../../db/Model/messageModel");

const addMessage = async (req,res)=>{

    const {chatid,senderid,text} = req.body;

    const newMessage = new messageModel({chatid,senderid,text});

    try {
        const result =await newMessage.save();

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}

const getMessages = async (req,res) =>{
    const {chatid} = req.params;

    try {
        const result = await messageModel.find({chatid});
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}


module.exports = {addMessage,getMessages};