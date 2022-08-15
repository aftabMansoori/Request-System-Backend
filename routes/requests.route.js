const express = require("express");
const router = express.Router();

const requestsController = require("../controllers/requests.controller");

const { authentcate, authorize } = require("../middlewares/auth");

router.post(
  "/",
  authentcate,
  authorize("general"),
  requestsController.createRequest
);
router.get(
  "/",
  authentcate,
  authorize("admin"),
  requestsController.getRequests
);
router.get(
  "/user-requests",
  authentcate,
  requestsController.getRequestsByUserId
);
router.patch(
  "/:id",
  authentcate,
  authorize("admin"),
  requestsController.manageRequest
);
router.delete("/:id", authentcate, requestsController.deleteRequest);

module.exports = router;
