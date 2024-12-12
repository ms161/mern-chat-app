const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please Provide Username."],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please Provide Email."],
    validate: [validator.isEmail, "Please Provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please Provide Password."],
    minlength: 8,
    select:false
  },
  confirmPassword: {
    type: String,
    required: [true, "Please Provide Confirm Password."],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not same.",
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

//document middleware
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

userSchema.methods.checkPassword = async function (password, userPassword) {
  return await bcrypt.compare(password, userPassword);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
