const chatModel = require("../../db/Model/chatModel");

const userChats = async (req, res) => {
    const { userid } = req.params;
    try {
        const chat = await chatModel.find({
            members: { $in: [userid] },
        });
        res.status(200).json(chat);
    } catch (error) {
        res.status(500).json(error);
    }
};

const findChat = async (req, res) => {
    const { firstid, secondid } = req.params;

    try {
        const chat = await chatModel.findOne({
            members: {
                $all: [firstid, secondid],
            },
        });
        res.status(200).json(chat);
    } catch (error) {
        res.status(500).json(error);
    }
};

const createChat = async (req, res) => {
    const { senderid, receiverid } = req.body;
    const exist = await chatModel.findOne({
        members: {
            $all: [senderid, receiverid],
        },
    });

    const newChat = new chatModel({
        members: [senderid, receiverid],
    });

    try {
        if (exist) {
            res.status(200).json(exist);
        } else {
            const result = await newChat.save();
            res.status(200).json(result);
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports = {
    createChat,
    userChats,
    findChat,
};
