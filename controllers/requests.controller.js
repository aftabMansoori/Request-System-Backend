const { catchAsync } = require("../utils/errorHandling");
const requestsSv = require("../services/requests.service");

const videoRequest = catchAsync(async (req, res) => {
  const request = req.body;

  const requestedVideo = await requestsSv.videoRequest(request);

  res.status(201).json({ status: "success", data: requestedVideo });
});

const getAllVideoRequests = catchAsync(async (req, res) => {
  const videoRequests = await requestsSv.getAllVideoRequests();
  res.status(200).json({ status: "success", data: videoRequests });
});

const getUserVideoRequests = catchAsync(async (req, res) => {
  const userId = req.params.id;
  const userVideoRequests = await requestsSv.getUserVideoRequests(userId);
  res.status(200).json({ status: "success", data: userVideoRequests });
});

const leaveRequest = catchAsync(async (req, res) => {
  const request = req.body;

  const leaveRequested = await requestsSv.leaveRequest(request);

  res.status(201).json({ status: "success", data: leaveRequested });
});

const getAllLeaveRequests = catchAsync(async (req, res) => {
  const videoRequests = await requestsSv.getAllLeaveRequests();
  res.status(200).json({ status: "success", data: videoRequests });
});

const getUserLeaveRequests = catchAsync(async (req, res) => {
  const userId = req.params.id;
  const userLeaveRequests = await requestsSv.getUserLeaveRequests(userId);
  res.status(200).json({ status: "success", data: userLeaveRequests });
});

module.exports = {
  videoRequest,
  getAllVideoRequests,
  getUserVideoRequests,
  leaveRequest,
  getAllLeaveRequests,
  getUserLeaveRequests,
};
