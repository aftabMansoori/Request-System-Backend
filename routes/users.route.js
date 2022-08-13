const express = require("express");
const router = express.Router();

const { authentcate, authorize } = require("../middlewares/auth");

const usersController = require("../controllers/users.controller");

router.post("/register", usersController.register);
router.post("/login", usersController.login);
router.get("/all", usersController.getAllUsers);
router.get("/:id", usersController.getUserbyId);

module.exports = router;
