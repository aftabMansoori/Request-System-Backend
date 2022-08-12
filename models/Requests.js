const mongoose = require("mongoose");

const requestsSchema = new mongoose.Schema(
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
    startDate: {
      type: Date,
      default: Date.now,
      required: true,
    },
    endDate: {
      type: Date,
    },
    requestStatus: {
      type: String,
      default: "Requested",
    },
    reason: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["video", "leave"],
    },
  },
  { timestamps: true }
);

requestsSchema.pre("save", function (next) {
  if (this.endDate === undefined) {
    this.endDate = this.startDate;
  }

  next();
});

mongoose.model("Requests", requestsSchema);