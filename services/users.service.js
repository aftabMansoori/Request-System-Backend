const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = mongoose.model("User");
const Admin = mongoose.model("Admin");

const addUser = async (user, adminId) => {
  try {
    if (user.role === "admin") {
      const admin = await Admin.findById(adminId);

      if (!admin.canCreate) {
        throw new Error("You are not aurhorized to create other admins");
      }
    }

    const salt = await bcrypt.genSalt(+process.env.SALT_FACTOR);
    user.password = await bcrypt.hash(user.password, salt);

    let addedUser;
    if (user.role === "general") addedUser = await User.create(user);
    if (user.role === "admin") addedUser = await Admin.create(user);

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
    const user = User.findById(id).populate({
      path: "requests",
      select: {
        _id: 0,
        requestStatus: 1,
        startDate: 1,
        endDate: 1,
        type: 1,
      },
    });

    return user;
  } catch (err) {
    throw err;
  }
};

const getUserbyEmail = async (email, type) => {
  try {
    let user;
    if (type === "general") {
      user = await User.findOne({ email });
    }
    if (type === "admin") {
      user = await Admin.findOne({ email });
    }

    if (!user) {
      throw new Error("User does not exists");
    }

    return user;
  } catch (err) {
    throw err;
  }
};

const signInUser = (isMatch, user, res) => {
  if (isMatch) {
    const claims = {
      role: user.role,
      email: user.email,
      id: user._id,
    };

    jwt.sign(claims, process.env.JWT_SECRET, function (err, token) {
      if (err) {
        throw err;
      }

      let signInUser = {
        name: user.name,
        email: user.email,
        role: user.role,
        token,
      };

      if (user.role === "admin") {
        signInUser = {
          ...signInUser,
          canCreate: user.canCreate,
        };
      }

      res.status(200).json({
        status: "success",
        data: {
          ...signInUser,
        },
      });
    });
  } else {
    throw new Error("Password does not match");
  }
};

module.exports = {
  addUser,
  allUsers,
  getUserbyId,
  getUserbyEmail,
  signInUser,
};
