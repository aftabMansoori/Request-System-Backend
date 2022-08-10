const { catchAsync } = require("../utils/errorHandling");

const { addUser } = require("../services/users.service");

const register = catchAsync(async (req, res) => {
  const user = req.body;
  if (Object.keys(user).length < 5) {
    throw new Error("Invalid Inputs");
  }

  const registeredUser = await addUser(user);
  res.status(201).json({ status: "success", data: registeredUser });
});

module.exports = {
  register,
};
