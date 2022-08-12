const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { catchAsync } = require("../utils/errorHandling");

const usersSv = require("../services/users.service");

const register = catchAsync(async (req, res) => {
  let user = req.body;

  if (Object.keys(user).length !== 6) {
    throw new Error("Invalid body inputs");
  }

  const salt = await bcrypt.genSalt(+process.env.SALT_FACTOR);
  user.password = await bcrypt.hash(user.password, salt);

  const registeredUser = await usersSv.addUser(user);

  const userData = { ...registeredUser.toObject() };
  delete userData.password;

  res.status(201).json({ status: "success", data: userData });
});

const login = catchAsync(async (req, res) => {
  const credentials = req.body;

  if (Object.keys(credentials).length < 2) {
    throw new Error("Email or Password is missing");
  }

  const { email, password } = credentials;

  const user = await usersSv.getUserbyEmail(email);

  const isMatch = await bcrypt.compare(password, user.password);

  if (isMatch) {
    const claims = {
      role: user.role,
      email: user.email,
    };

    jwt.sign(claims, process.env.JWT_SECRET, function (err, token) {
      if (err) {
        throw err;
      }

      res.status(200).json({
        status: "success",
        data: {
          name: user.name,
          email: user.email,
          role: user.role,
          token,
        },
      });
    });
  } else {
    throw new Error("Password does not match");
  }
});

const getAllUsers = catchAsync(async (req, res) => {
  const allUsers = await usersSv.allUsers();

  res.status(200).json({ status: "success", data: allUsers });
});

const getUserbyId = catchAsync(async (req, res) => {
  const id = req.params.id;
  const user = await usersSv.getUserbyId(id);

  res.status(200).json({ status: "success", data: user });
});

module.exports = {
  register,
  login,
  getAllUsers,
  getUserbyId,
};
