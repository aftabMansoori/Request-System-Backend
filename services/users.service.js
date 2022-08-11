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

const allUsers = async () => {
  try {
    const allUsers = await User.find();
    return allUsers;
  } catch (err) {
    throw err;
  }
};

const getUserbyId = async (id) => {
  try {
    const user = User.findById({ _id: id });
    return user;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  addUser,
  allUsers,
  getUserbyId,
};
