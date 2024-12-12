const User = require("../models/userModel");
const AppError = require("../utils/appError");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res, next) => {
  try {
    const user = await User.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        user,
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

async function jwtSign(user) {
  const token = await jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return token;
}

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email }).select(
      "password username email _id"
    );
    const userObj = user.toObject();
    delete userObj.password;
    const token = await jwtSign(userObj);
    if (!user || !(await user.checkPassword(password, user.password))) {
      return next(new AppError("Email or Password in incorrect", 401));
    }
    res.status(200).json({
      status: "success",
      token,
      data: {
        user: userObj,
      },
    });
    console.log(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};

exports.protect = async (req, res, next) => {
  console.log(req.headers.authorization);
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(new AppError("Please Login first", 401));
  }

  //validate the token
  const decoded = await jwt.decode(token, process.env.JWT_SECRET);
  console.log(decoded);
  const currentUser = await User.findOne({ email: decoded.email });
  if (!currentUser) {
    return next(
      new AppError("The user belonging to this token is no longer exist")
    );
  }
  req.user = currentUser;
  next();
};
