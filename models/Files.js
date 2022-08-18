const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema(
  {
    fileName: {
      type: String,
      required: true,
    },
    fileDriveId: {
      type: String,
      required: true,
    },
    videoLink: {
      type: String,
      required: true,
    },
    createdTime: {
      type: Date,
      required: true,
    },
    thumbnail: {
      type: String,
    },
    requestsId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Requests",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      Ref: "User",
    },
  },
  { timestamps: true }
);

mongoose.model("Files", fileSchema);
