const Chat = require("../models/chatModel");

exports.saveChat = async (req, res, next) => {
  try {
    const { recieverId } = req.params;
    const { message } = req.body;
  
    const chat = await Chat.create({
      message,
      reciever: recieverId,
      sender: req.user._id,
    });
   
    res.status(200).json({
      status: "success",
      data: {
        chat,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};

exports.getOneToOneChat = async (req, res, next) => {
  try {
    const { sentToId } = req.params;
    const chats = await Chat.find({
      $or: [
        { sender: req.user._id, reciever: sentToId },
        // { sender: sentToId, reciever: req.user._id },
      ],
    })
      .populate({ path: "sender reciever", select: "username" })
      .sort({ createdAt: 1 });
 
    res.status(200).json({
      status: "success",
      data: {
        chats,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};
