const { catchAsync } = require("../utils/errorHandling");

const { addUser } = require("../services/users.service");

const register = catchAsync(async (req, res) => {
  const user = req.body;

  if (Object.keys(user).length !== 6) {
    throw new Error("Invalid body inputs");
  }

  let registeredUser = await addUser(user);

  res.status(201).json({ status: "success", data: registeredUser });
});

const createAdmin = catchAsync(async (req, res) => {
  const user = req.body;

  if (Object.keys(user).length !== 6) {
    throw new Error("Invalid body inputs");
  }

  let adminCreated = await addUser(user);

  res.status(201).json({ status: "success", data: adminCreated });
});

module.exports = {
  register,
  createAdmin,
};
