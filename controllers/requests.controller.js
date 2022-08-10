const { catchAsync } = require("../utils/errorHandling");
const requestsSv = require("../services/requests.service");

const videoRequest = catchAsync(async (req, res) => {
  const request = req.body;

  const requestedVideo = await requestsSv.videoRequest(request);

  res.status(201).json({ status: "success", data: requestedVideo });
});

const leaveRequest = catchAsync(async (req, res) => {
  const request = req.body;

  const leaveRequested = await requestsSv.leaveRequest(request);

  res.status(201).json({ status: "success", data: leaveRequested });
});

module.exports = {
  videoRequest,
  leaveRequest,
};
