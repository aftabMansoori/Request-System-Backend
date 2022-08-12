const mongoose = require("mongoose");

const permissionSchema = new mongoose.Schema(
  {
    permissionId: {
      type: String,
    },
    type: {
      type: String,
    },
    role: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = permissionSchema;
