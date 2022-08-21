const mongoose = require("mongoose");

const gdapi = require("../GoogleDriveApis/GoogleDriveServices");
const { errorHandling } = require("../utils/errorHandling");

const User = mongoose.model("User");
const Requests = mongoose.model("Requests");

const getVideosList = async (batch, day) => {
  try {
    const videoList = await gdapi.searchFiles(batch, day);
    return videoList.data;
  } catch (err) {
    errorHandling(err);
  }
};

const getStats = async () => {
  try {
    const leaveRequests = await Requests.countDocuments({
      $and: [{ type: "leave" }, { requestStatus: "Requested" }],
    });
    const videoRequests = await Requests.countDocuments({
      $and: [{ type: "video" }, { requestStatus: "Requested" }],
    });
    const users = await User.countDocuments();

    return { leaveRequests, videoRequests, users };
  } catch (err) {
    errorHandling(err);
  }
};

const deleteUser = async (id) => {
  try {
    let user = await User.findByIdAndRemove(id);

    if (user === null) {
      throw new Error("No such user exists");
    }

    await Requests.deleteMany({ userId: id });

    return user;
  } catch (err) {
    errorHandling(err);
  }
};

module.exports = {
  getVideosList,
  getStats,
  deleteUser,
};
