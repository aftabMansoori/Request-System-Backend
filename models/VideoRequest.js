const mongoose = require("mongoose");

const videoRequestSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
    required: true,
  },
  requestedFor: {
    type: Date,
    default: Date.now,
    required: true,
  },
  videoStatus: {
    type: String,
    default: "In Progress",
  },
  reason: {
    type: String,
    required: true,
  },
});

mongoose.model("VideoRequest", videoRequestSchema);
