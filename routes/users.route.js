const express = require("express");
const router = express.Router();

const usersSv = require("../controllers/users.controller");

router.post("/register", usersSv.register);
router.post("/admin/add", usersSv.createAdmin);

module.exports = router;
