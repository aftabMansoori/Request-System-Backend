const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
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
  batch: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    unique: true,
    required: true,
  },
  role: {
    type: String,
    default: "general",
    required: true,
  },
});

mongoose.model("User", userSchema);
