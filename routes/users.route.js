const express = require("express");
const router = express.Router();

const { authentcate, authorize } = require("../middlewares/auth");

const usersController = require("../controllers/users.controller");

router.post("/register", usersController.register);
router.post("/login", usersController.login);
router.get("/all", authentcate, usersController.getAllUsers);
router.get("/:id", authentcate, usersController.getUserbyId);

module.exports = router;
