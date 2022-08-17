const express = require("express");
const router = express.Router();

const { authentcate, authorize } = require("../middlewares/auth");

const adminController = require("../controllers/admin.controller");

// admin has a same route for login
router.post(
  "/add-admin",
  authentcate,
  authorize("admin"),
  adminController.createAdmin
);
// router.post("/create-folder", adminController.createFolder);
// router.delete("/:id", adminController.deleteFile);
router.get(
  "/get-files",
  authentcate,
  authorize("admin"),
  adminController.getVideosList
);

module.exports = router;
