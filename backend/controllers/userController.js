const User = require("../models/userModel");

exports.getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await User.find();

    res.status(200).json({
      status: "success",
      data: {
        users: allUsers,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};
