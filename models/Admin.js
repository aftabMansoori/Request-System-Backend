const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  canCreate: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    default: "admin",
  },
});

mongoose.model("Admin", adminSchema);
