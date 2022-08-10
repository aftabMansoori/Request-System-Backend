const mongoose = require("mongoose");

const User = mongoose.model("User");

const addUser = async (user) => {
  try {
    const addedUser = await User.create(user);
    return addedUser;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  addUser,
};
