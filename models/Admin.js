const mongoose = require("mongoose");

const adminSchema = mongoose.Schema(
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
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

adminSchema.virtual("requests", {
  ref: "Requests",
  localField: "_id",
  foreignField: "adminId",
});

mongoose.model("Admin", adminSchema);
