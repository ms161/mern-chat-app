const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  message: {
    type: String,
    required: [true, "Message cant be empty"],
  },
  sender: {
    type: mongoose.Schema.ObjectId,
    required: [true, "Sender cant be empty"],
    ref: "User",
  },
  reciever: {
    type: mongoose.Schema.ObjectId,
    required: [true, "Reciever cant be empty"],
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;
