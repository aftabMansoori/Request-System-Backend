const mongoose = require("mongoose");

const User = mongoose.model("User");
const Admin = mongoose.model("Admin");

const addUser = async (user) => {
  try {
    let addedUser;
    if (user.role === "general") {
      addedUser = await User.create(user);
      return addedUser;
    } else if (user.role === "admin") {
      addedUser = await Admin.create(user);
      return addedUser;
    } else {
      throw new Error("Invalid body inputs");
    }
  } catch (err) {
    throw err;
  }
};

module.exports = {
  addUser,
};
