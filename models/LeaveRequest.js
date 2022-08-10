const mongoose = require("mongoose");

const leaveRequestSchema = new mongoose.Schema({
  startDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  endDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  requestedOn: {
    type: Date,
    default: Date.now,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  requestStatus: {
    type: String,
    default: "",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
  },
});

mongoose.model("LeaveRequest", leaveRequestSchema);
