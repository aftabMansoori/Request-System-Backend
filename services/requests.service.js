const mongoose = require("mongoose");

const VideoRequest = mongoose.model("VideoRequest");
const LeaveRequest = mongoose.model("LeaveRequest");
const User = mongoose.model("User");

const videoRequest = async (request) => {
  try {
    const user = await User.findById(request.userId);

    if (!user) {
      throw new Error("User doesn't exist");
    }

    const videoRequested = await VideoRequest.create(request);
    return videoRequested;
  } catch (err) {
    throw err;
  }
};

const getAllVideoRequests = async () => {
  try {
    const videoRequests = await VideoRequest.find();
    return videoRequests;
  } catch (err) {
    throw err;
  }
};

const getUserVideoRequests = async (id) => {
  try {
    const userVideoRequests = await VideoRequest.find({ userId: id });
    return userVideoRequests;
  } catch (err) {
    throw err;
  }
};

const leaveRequest = async (request) => {
  try {
    const user = await User.findById(request.userId);

    if (!user) {
      throw new Error("User doesn't exist");
    }

    const leaveRequested = await LeaveRequest.create(request);
    return leaveRequested;
  } catch (err) {
    throw err;
  }
};

const getAllLeaveRequests = async () => {
  try {
    const videoRequests = await LeaveRequest.find();
    return videoRequests;
  } catch (err) {
    throw err;
  }
};

const getUserLeaveRequests = async (id) => {
  try {
    const userLeaveRequests = await LeaveRequest.find({ userId: id });
    return userLeaveRequests;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  videoRequest,
  getAllVideoRequests,
  getUserVideoRequests,
  leaveRequest,
  getAllLeaveRequests,
  getUserLeaveRequests,
};
