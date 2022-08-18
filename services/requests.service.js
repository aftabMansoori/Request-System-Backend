const mongoose = require("mongoose");

const gdapi = require("../GoogleDriveApis/GoogleDriveServices");
const { errorHandling } = require("../utils/errorHandling");

const User = mongoose.model("User");
const Requests = mongoose.model("Requests");
const Admin = mongoose.model("Admin");
const Files = mongoose.model("Files");

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

const getRequests = async (type, batch, status, page = 1) => {
  try {
    let allRequests;

    let requestStatus;
    if (status) {
      requestStatus = status[0].toUpperCase() + status.slice(1);
    }

    if (!!type && !!batch && !!status) {
      if (batch === "all") {
        allRequests = Requests.find({
          $and: [
            {
              type: type,
            },
            {
              requestStatus: requestStatus,
            },
          ],
        });
      } else {
        allRequests = Requests.find({
          $and: [
            {
              batch: batch,
            },
            {
              type: type,
            },
            {
              requestStatus: requestStatus,
            },
          ],
        });
      }
    } else if ((type && batch) || (type && status) || (batch && status)) {
      allRequests = Requests.find({
        $or: [
          {
            $and: [
              {
                type: type,
              },
              {
                requestStatus: requestStatus,
              },
            ],
          },
          {
            $and: [
              {
                type: type,
              },
              {
                batch: batch,
              },
            ],
          },
          {
            $and: [
              {
                requestStatus: requestStatus,
              },
              {
                batch: batch,
              },
            ],
          },
        ],
      });
    } else if (!!type || !!batch || !!requestStatus) {
      allRequests = Requests.find({
        $or: [
          {
            type: type,
          },
          {
            requestStatus: requestStatus,
          },
          {
            batch: batch,
          },
        ],
      });
    } else {
      allRequests = Requests.find();
    }

    const skipWorkshops = 10 * (page - 1);
    let next = false;

    let requests = await allRequests.skip(skipWorkshops).limit(10);

    const updatedRequest = await Promise.all(
      requests.map(async (request) => {
        const user = await User.findById(request.userId);
        const newRequest = {
          ...request.toObject(),
          ...{ name: user.name },
        };

        return newRequest;
      })
    );

    if (updatedRequest.length >= 3) next = true;
    else if (requests.length === 0) {
      next = false;
      return {
        page,
        next,
        requests: [],
        message: "No more requests exists",
      };
    } else {
      next = false;
    }

    return {
      count: updatedRequest.length,
      next,
      page,
      requests: updatedRequest,
    };
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
    errorHandling(err);
  }
};

const manageRequest = async (id, type, status, adminId, video) => {
  try {
    let request = await Requests.findById(id);
    let admin = await Admin.findById(adminId);
    if (request && type === "leave") {
      request.requestStatus = status;
      request.adminName = admin.name;

      const user = await User.findById(request.userId);

      const response = await gdapi.readPermission(video.id, user.email, "user");
      console.log(response);
      console.log("success");

      request = await request.save();

      return request;
    } else if (request && type === "video") {
      request.requestStatus = status;
      request.adminName = admin.name;

      const fileShared = await Files.create({
        fileName: video.name,
        fileDriveId: video.id,
        requestsId: id,
        videoLink: video.webViewLink,
      });

      request = await request.save();

      return { request, fileShared };
    } else {
      throw new Error("Requests does not exists");
    }
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
