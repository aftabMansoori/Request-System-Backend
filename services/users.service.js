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

const getUserbyEmail = async (email) => {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("User does not exists");
    }

    return user;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  addUser,
  allUsers,
  getUserbyId,
  getUserbyEmail,
};
