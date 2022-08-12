const mongoose = require("mongoose");

const folderSchema = new mongoose.Schema(
  {
    folderDriveId: {
      type: String,
      required: true,
    },
    folderName: {
      type: String,
      required: true,
    },
    trashed: {
      type: Boolean,
      default: false,
    },
    parents: {
      type: Array,
      required: true,
    },
    permissionIds: {
      type: Array,
    },
  },
  { timestamps: true }
);

mongoose.model("Folder", folderSchema);
