const express = require("express");
const router = express.Router();

const adminController = require("../controllers/admin.controller");

router.post("/add-admin", adminController.createAdmin);
router.post("/create-folder", adminController.createFolder);
router.delete("/:id", adminController.deleteFile);

module.exports = router;
