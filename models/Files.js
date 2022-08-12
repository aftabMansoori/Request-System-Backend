const mongoose = require("mongoose");
const permissionSchema = require("./Permission");

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
    permissions: {
      type: permissionSchema,
    },
    requestsId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Requests",
    },
  },
  { timestamps: true }
);

mongoose.model("Files", fileSchema);
