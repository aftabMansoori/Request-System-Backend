const { catchAsync } = require("../utils/errorHandling");

const usersSv = require("../services/users.service");

const register = catchAsync(async (req, res) => {
  const user = req.body;

  if (Object.keys(user).length !== 6) {
    throw new Error("Invalid body inputs");
  }

  let registeredUser = await usersSv.addUser(user);

  res.status(201).json({ status: "success", data: registeredUser });
});

const createAdmin = catchAsync(async (req, res) => {
  const user = req.body;

  if (Object.keys(user).length !== 6) {
    throw new Error("Invalid body inputs");
  }

  let adminCreated = await usersSv.addUser(user);

  res.status(201).json({ status: "success", data: adminCreated });
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
  createAdmin,
  getAllUsers,
  getUserbyId,
};
