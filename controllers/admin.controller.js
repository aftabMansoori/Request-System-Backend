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
  console.log(day);

  if (!batch) {
    throw new Error("Please select the batch");
  }

  const videoList = await adminSv.getVideosList(batch, day);

  res.status(200).json({ message: "success", data: videoList });
});

// const createFolder = catchAsync(async (req, res) => {
//   let { folderName, parentFolderID } = req.body;

//   const createdFolder = await adminSv.createFolder(folderName, parentFolderID);

//   res.status(201).json({ status: "success", data: createdFolder });
// });

// const deleteFile = catchAsync(async (req, res) => {
//   const fileId = req.params.id;

//   await adminSv.deleteFile(fileId);

//   res.status(204).json({ status: "deleted successfully" });
// });

module.exports = {
  createAdmin,
  // createFolder,
  // deleteFile,
  getVideosList,
};
