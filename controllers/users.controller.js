const bcrypt = require("bcrypt");
const { catchAsync } = require("../utils/errorHandling");

const usersSv = require("../services/users.service");

const register = catchAsync(async (req, res) => {
  let user = req.body;

  if (Object.keys(user).length !== 6) {
    throw new Error("Invalid body inputs");
  }

  const registeredUser = await usersSv.addUser(user);

  const userData = { ...registeredUser.toObject() };
  delete userData.password;

  res.status(201).json({ status: "success", data: userData });
});

const login = catchAsync(async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password) {
    throw new Error("Email or Password is missing");
  }

  if (!role) {
    throw new Error("User type is missing");
  }

  const user = await usersSv.getUserbyEmail(email, role);

  const isMatch = await bcrypt.compare(password, user.password);

  await usersSv.signInUser(isMatch, user, res);
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
