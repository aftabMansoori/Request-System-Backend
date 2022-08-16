const { catchAsync } = require("../utils/errorHandling");
const requestsSv = require("../services/requests.service");

const createRequest = catchAsync(async (req, res) => {
  let request = req.body;

  const { id } = res.locals.claims;
  request.userId = id;

  const createdRequest = await requestsSv.createRequest(request);

  res.status(201).json({ status: "success", data: createdRequest });
});

const getRequests = catchAsync(async (req, res) => {
  const { type, batch } = req.query;
  const requests = await requestsSv.getRequests(type, batch);
  res.status(200).json({ status: "success", data: requests });
});

const getRequestsByUserId = catchAsync(async (req, res) => {
  const userId = res.locals.claims.id;
  const type = req.query.type;

  const userRequests = await requestsSv.getRequestsByUserId(userId, type);

  res.status(200).json({ status: "success", data: userRequests });
});

const manageRequest = catchAsync(async (req, res) => {
  const id = req.params.id;
  const type = req.query.type;
  const { status } = req.body;

  const adminId = res.locals.claims.id;

  const updatedRequest = await requestsSv.manageRequest(
    id,
    type,
    status,
    adminId
  );

  res.status(200).json({ status: "success", data: updatedRequest });
});

const deleteRequest = catchAsync(async (req, res) => {
  const requestId = req.params.id;

  await requestsSv.deleteRequest(requestId);

  res.status(204).json({ status: "success" });
});

module.exports = {
  createRequest,
  getRequests,
  getRequestsByUserId,
  manageRequest,
  deleteRequest,
};
