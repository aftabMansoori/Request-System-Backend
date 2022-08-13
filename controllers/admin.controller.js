const { catchAsync } = require("../utils/errorHandling");

const adminSv = require("../services/admin.service");
const userSv = require("../services/users.service");

const createAdmin = catchAsync(async (req, res) => {
  let user = req.body;

  if (Object.keys(user).length !== 6) {
    throw new Error("Invalid body inputs");
  }

  let adminCreated = await userSv.addUser(user);
  const userData = { ...adminCreated.toObject() };
  delete userData.password;

  res.status(201).json({ status: "success", data: userData });
});

const createFolder = catchAsync(async (req, res) => {
  let { folderName, parentFolderID } = req.body;

  const createdFolder = await adminSv.createFolder(folderName, parentFolderID);

  res.status(201).json({ status: "success", data: createdFolder });
});

const deleteFile = catchAsync(async (req, res) => {
  const fileId = req.params.id;

  await adminSv.deleteFile(fileId);

  res.status(204).json({ status: "deleted successfully" });
});

module.exports = {
  createAdmin,
  createFolder,
  deleteFile,
};
