const { catchAsync } = require("../utils/errorHandling");

const adminSv = require("../services/admin.service");

const createAdmin = catchAsync(async (req, res) => {
  const user = req.body;

  if (Object.keys(user).length !== 6) {
    throw new Error("Invalid body inputs");
  }

  let adminCreated = await adminSv.addUser(user);

  res.status(201).json({ status: "success", data: adminCreated });
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
