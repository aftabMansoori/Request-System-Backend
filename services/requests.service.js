const mongoose = require("mongoose");

const User = mongoose.model("User");
const Requests = mongoose.model("Requests");

const createRequest = async (request) => {
  try {
    const user = await User.findById(request.userId);

    if (!user) {
      throw new Error("User doesn't exist");
    }

    if (request.type === "leave" && !request.endDate) {
      throw new Error("End Date is required");
    }

    const createdRequested = await Requests.create(request);
    return createdRequested;
  } catch (err) {
    throw err;
  }
};

const getRequests = async (type) => {
  try {
    let allRequests;
    if (type) {
      allRequests = await Requests.find({ type });
    } else {
      allRequests = await Requests.find();
    }

    return allRequests;
  } catch (err) {
    throw err;
  }
};

const getRequestsByUserId = async (id, type) => {
  try {
    let userRequests;

    if (type) {
      userRequests = await Requests.find({ $and: [{ userId: id }, { type }] });
    } else {
      userRequests = await Requests.find({ userId: id });
    }

    return userRequests;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  createRequest,
  getRequests,
  getRequestsByUserId,
};
