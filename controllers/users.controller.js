const { addUser } = require("../services/users.service");

const register = async (req, res) => {
  const user = req.body;

  if (Object.keys(user).length === 0) {
    throw new Error("Invalid inputs");
  }

  try {
    const registeredUser = await addUser(user);

    res.status(201).json({ status: "success", data: registeredUser });
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  register,
};
