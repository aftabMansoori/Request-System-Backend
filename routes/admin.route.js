const express = require("express");
const router = express.Router();

const adminController = require("../controllers/admin.controller");

// admin has a same route for login
router.post("/add-admin", adminController.createAdmin);
router.post("/create-folder", adminController.createFolder);
router.delete("/:id", adminController.deleteFile);

module.exports = router;
