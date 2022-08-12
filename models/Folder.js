const mongoose = require("mongoose");
const permissionSchema = require("./Permission");

const folderSchema = new mongoose.Schema(
  {
    folderName: {
      type: String,
      required: true,
    },
    folderDriveId: {
      type: String,
      required: true,
    },
    permissons: {
      type: permissionSchema,
    },
  },
  { timestamps: true }
);

mongoose.model("Folder", folderSchema);
