const { catchAsync } = require("../utils/errorHandling");

const adminSv = require("../services/admin.service");
const userSv = require("../services/users.service");

const createAdmin = catchAsync(async (req, res) => {
  let user = req.body;

  for (let key in user) {
    if (typeof user[key] !== "boolean" && !!user[key] === false)
      throw new Error(`${key} input is missing`);
  }

  const adminId = res.locals.claims.id;
  let adminCreated = await userSv.addUser(user, adminId);
  const userData = { ...adminCreated.toObject() };
  delete userData.password;

  res.status(201).json({ status: "success", data: userData });
});

const getVideosList = catchAsync(async (req, res) => {
  const { batch, day } = req.query;

  if (!batch) {
    throw new Error("Please select the batch");
  }

  const videoList = await adminSv.getVideosList(batch, day);

  res.status(200).json({ message: "success", data: videoList });
});

const getStats = catchAsync(async (req, res) => {
  const stats = await adminSv.getStats();

  res.status(200).json({ message: "success", data: stats });
});

const deleteUser = catchAsync(async (req, res) => {
  const userId = req.params.id;

  await adminSv.deleteUser(userId);

  res.status(204).json({ status: "success" });
});

module.exports = {
  createAdmin,
  getVideosList,
  getStats,
  deleteUser,
};
