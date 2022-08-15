const mongoose = require("mongoose");

const User = mongoose.model("User");
const Requests = mongoose.model("Requests");

const createRequest = async (request) => {
  try {
    const user = await User.findById(request.userId);

    for (let key in request) {
      if (!!request[key] === false) {
        if (key === "startDate") key = "start date";
        if (key === "endDate") key = "end date";
        throw new Error(`Please specify the ${key}`);
      }
    }

    if (!user) {
      throw new Error("User doesn't exist");
    }

    if (request.type === "leave" && !request.endDate) {
      throw new Error("End Date is required");
    }

    request.batch = user.batch;

    const createdRequested = await Requests.create(request);
    return createdRequested;
  } catch (err) {
    throw err;
  }
};

const getRequests = async (type, batch = "all") => {
  try {
    let allRequests;

    if (type && batch !== "all") {
      allRequests = await Requests.find({
        $and: [{ batch }, { type }],
      });
    } else if (type || batch) {
      allRequests = await Requests.find({
        $or: [
          {
            type: type,
          },
          {
            batch: batch,
          },
        ],
      });
    } else {
      allRequests = await Requests.find();
    }

    const updatedRequests = await Promise.all(
      allRequests.map(async (request) => {
        const user = await User.findById(request.userId);
        const newRequest = {
          ...request.toObject(),
          ...{ name: user.name },
        };

        return newRequest;
      })
    );

    return { count: allRequests.length, requests: updatedRequests };
  } catch (err) {
    throw err;
  }
};

const getRequestsByUserId = async (id, type) => {
  try {
    let userRequests;

    const user = await User.findById(id);

    if (!user) {
      throw new Error("User does not exists");
    }

    if (type !== "all") {
      userRequests = await Requests.find({ $and: [{ userId: id }, { type }] });
    } else {
      userRequests = await Requests.find({ userId: id });
    }

    return userRequests;
  } catch (err) {
    throw err;
  }
};

const manageRequest = async (id, type, status) => {
  try {
    let request = await Requests.findById(id);

    if (request && type === "leave") {
      request.requestStatus = status;
      request = await request.save();
    } else {
      throw new Error("Requests does not exists");
    }

    return request;
  } catch (err) {
    throw err;
  }
};

const deleteRequest = async (id) => {
  try {
    let request = await Requests.findByIdAndRemove(id);

    if (request === null) {
      throw new Error("No such request exists");
    }

    return request;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  createRequest,
  getRequests,
  getRequestsByUserId,
  manageRequest,
  deleteRequest,
};
