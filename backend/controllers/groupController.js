const Group = require("../models/groupModel");
const AppError = require("../utils/appError");

exports.createGroup = async (req, res, next) => {
  try {
    console.log(req.user._id);
    const { groupName } = req.body;
    const group = await Group.create({
      groupName,
      members: [
        {
          userDetails: req.user._id,
          isAdmin: true,
        },
      ],
    });
    console.log(group);
    res.status(201).json({
      status: "success",
      group,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};

exports.getAllGroups = async (req, res, next) => {
  try {
    const allGroups = await Group.find();
    res.status(201).json({
      status: "success",
      allGroups,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};

exports.getMyGroups = async (req, res, next) => {
  try {
    console.log("fad");
    const myGroups = await Group.find({
      "members.userDetails": req.user._id,
    }).populate({ path: "members.userDetails", select: "username" });

    res.status(200).json({
      status: "success",
      length: myGroups.length,
      data:myGroups,
    });

    console.log(myGroups);
  } catch (error) {}
};

exports.addMemberToGroup = async (req, res, next) => {
  try {
    const { userId, groupId } = req.body;
    if (!userId || !groupId) {
      return next(new AppError("Please provide group id and user id", 400));
    }
    const updatedGroup = await Group.findByIdAndUpdate(
      groupId,
      { $addToSet: { members: { userDetails: userId, isAdmin: false } } },
      { new: true }
    ).populate({ path: "members.userDetails", select: "username" });

    res.status(200).json({
      status: "success",

      updatedGroup,
    });
    console.log(updatedGroup);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};
