const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users.controller");

router.post("/register", usersController.register);
router.post("/admin/add", usersController.createAdmin);
router.get("/all", usersController.getAllUsers);
router.get("/:id", usersController.getUserbyId);

module.exports = router;
