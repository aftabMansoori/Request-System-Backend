const mongoose = require("mongoose");

const videoRequestSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
    requestedFor: {
      type: Date,
      required: true,
    },
    videoStatus: {
      type: String,
      default: "Requested",
    },
    reason: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

mongoose.model("VideoRequest", videoRequestSchema);
