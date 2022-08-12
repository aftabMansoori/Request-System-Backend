const { catchAsync } = require("../utils/errorHandling");
const requestsSv = require("../services/requests.service");

const createRequest = catchAsync(async (req, res) => {
  const request = req.body;

  const createdRequest = await requestsSv.createRequest(request);

  res.status(201).json({ status: "success", data: createdRequest });
});

const getRequests = catchAsync(async (req, res) => {
  const type = req.query.type;
  const requests = await requestsSv.getRequests(type);
  res.status(200).json({ status: "success", data: requests });
});

const getRequestsByUserId = catchAsync(async (req, res) => {
  const userId = req.params.id;
  const type = req.query.type;
  const userRequests = await requestsSv.getRequestsByUserId(userId, type);
  res.status(200).json({ status: "success", data: userRequests });
});

const manageRequest = catchAsync(async (req, res) => {
  const id = req.params.id;
  const type = req.query.type;
  const { status } = req.body;

  const updatedRequest = await requestsSv.manageRequest(id, type, status);

  res.status(200).json({ status: "success", json: updatedRequest });
});

module.exports = {
  createRequest,
  getRequests,
  getRequestsByUserId,
  manageRequest,
};
