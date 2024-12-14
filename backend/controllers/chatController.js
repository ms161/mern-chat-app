const Chat = require("../models/chatModel");
const AppError = require("../utils/appError");

exports.saveChat = async (req, res, next) => {
  try {
    // const { recieverId } = req.params;
    const { message, recieversId, isGroupChat } = req.body;
    console.log(req.body);
    if (!message || !recieversId || isGroupChat === undefined)
      return next(
        new AppError(
          "Message, recieversId and isGroupChat can not be empty.",
          400
        )
      );
    const chat = await Chat.create({
      isGroupChat,
      message,
      recievers: recieversId,
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

exports.getChats = async (req, res, next) => {
  try {
    if (!req.isGroupChat) req.isGroupChat = false;
    const { sentToIds } = req.body;
    const chats = await Chat.find({
      $or: [
        {
          sender: req.user._id,
          recievers: sentToIds,
          isGroupChat: req.isGroupChat,
        },
        {
          sender: sentToIds,
          recievers: req.user._id,
          isGroupChat: req.isGroupChat,
        },
      ],
    })
      .populate({ path: "sender recievers", select: "username" })
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

exports.convertToGroupChat = async (req, res, next) => {
  req.isGroupChat = true;
};
