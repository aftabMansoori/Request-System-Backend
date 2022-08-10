const mongoose = require("mongoose");

const VideoRequest = mongoose.model("VideoRequest");
const LeaveRequest = mongoose.model("LeaveRequest");

const videoRequest = async (request) => {
  try {
    const videoRequested = await VideoRequest.create(request);
    return videoRequested;
  } catch (err) {
    throw err;
  }
};

const leaveRequest = async (request) => {
  try {
    const leaveRequested = await LeaveRequest.create(request);
    return leaveRequested;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  videoRequest,
  leaveRequest,
};
