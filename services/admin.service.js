const mongoose = require("mongoose");

const gdapi = require("../GoogleDriveApis/GoogleDriveServices");

const Admin = mongoose.model("Admin");
const Folder = mongoose.model("Folder");

const addUser = async (user) => {
  try {
    const addedUser = await Admin.create(user);
    return addedUser;
  } catch (err) {
    throw err;
  }
};

const createFolder = async (folderName, parentFolderId) => {
  try {
    const response = await gdapi.createFolder(folderName, parentFolderId);

    const createdFolder = await Folder.create({
      folderName: response.data.name,
      folderDriveId: response.data.id,
      ...response.data,
    });
    return createdFolder;
  } catch (err) {
    throw err;
  }
};

const deleteFile = async (id) => {
  try {
    const { folderDriveId } = await Folder.findByIdAndRemove(id);
    await gdapi.deleteFile(folderDriveId);
  } catch (err) {
    throw err;
  }
};

// const giveReadPermission = async (
//   id = "1iGlLB5IlKshLcXSvBowXWDYhd5Jl4coJ",
//   email,
//   type
// ) => {
//   try {
//     const persmissionStatus = await gdapi()
//   } catch (err) {
//     throw err;
//   }
// };

module.exports = {
  addUser,
  createFolder,
  deleteFile,
};
