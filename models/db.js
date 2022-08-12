const mongoose = require("mongoose");

require("./User");
require("./Admin");
require("./Requests");
require("./Folder");
require("./Files");

const connect = async function () {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database is live");
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

module.exports = {
  connect,
};
