const mongoose = require("mongoose");
const User = require("./userModel");
const chatSchema = new mongoose.Schema({
  message: {
    type: String,
    required: [true, "Message cant be empty"],
  },
  isGroupChat: {
    type: Boolean,
    required: true,
  },
  sender: {
    type: mongoose.Schema.ObjectId,
    required: [true, "Sender cant be empty"],
    ref: "User",
  },
  recievers: [
    {
      type: mongoose.Schema.ObjectId,
      required: [true, "Reciever cant be empty"],
      ref: "User",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;
