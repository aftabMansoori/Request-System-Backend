const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    unique: true,
    required: true,
  },
  canCreate: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: ["admin"],
    required: true,
  },
});

mongoose.model("Admin", adminSchema);
