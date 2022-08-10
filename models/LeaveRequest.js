const mongoose = require("mongoose");

const leaveRequestSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
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
    reason: {
      type: String,
      required: true,
    },
    requestStatus: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

mongoose.model("LeaveRequest", leaveRequestSchema);
