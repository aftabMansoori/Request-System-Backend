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
    requestsId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Requests",
    },
  },
  { timestamps: true }
);

mongoose.model("Files", fileSchema);
