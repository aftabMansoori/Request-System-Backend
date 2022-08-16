const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
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
      enum: ["mevn-batch-1", "mevn-batch-2", "django", "ui-ux"],
    },
    phone: {
      type: Number,
      unique: true,
      required: true,
    },
    role: {
      type: String,
      enum: ["general"],
      required: true,
    },
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

userSchema.virtual("requests", {
  ref: "Requests",
  localField: "_id",
  foreignField: "userId",
});

mongoose.model("User", userSchema);
