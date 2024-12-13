const mongoose = require("mongoose");
const groupSchema = new mongoose.Schema({
  groupName: {
    type: String,
    required: [true, "Required Group Name."],
  },
  
  members: [
   {
    userDetails:{
      type:mongoose.Schema.ObjectId,
      ref:"User"
    },
    isAdmin:{
      type:Boolean,
      default:false,
    }
   }
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Group = mongoose.model("Group", groupSchema);
module.exports = Group;
