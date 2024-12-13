const mongoose = require("mongoose");
const groupSchema = new mongoose.Schema({
  groupName: {
    type: String,
    required: [true, "Message cant be empty"],
  },
  members: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const group = mongoose.model("Chat", groupSchema);
module.exports = group;
