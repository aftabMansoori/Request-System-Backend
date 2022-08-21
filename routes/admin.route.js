const express = require("express");
const router = express.Router();

const { authentcate, authorize } = require("../middlewares/auth");

const adminController = require("../controllers/admin.controller");

router.post(
  "/add-admin",
  authentcate,
  authorize("admin"),
  adminController.createAdmin
);
router.get("/stats", authentcate, authorize("admin"), adminController.getStats);
router.get(
  "/get-files",
  authentcate,
  authorize("admin"),
  adminController.getVideosList
);
router.delete(
  "/:id",
  authentcate,
  authorize("admin"),
  adminController.deleteUser
);

module.exports = router;
