const express = require("express");
const router = express.Router();

const requestsController = require("../controllers/requests.controller");

router.post("/video", requestsController.videoRequest);
router.post("/leave", requestsController.leaveRequest);
router.get("/videos", requestsController.getAllVideoRequests);
router.get("/leaves", requestsController.getAllLeaveRequests);
router.get("/videos/:id", requestsController.getUserVideoRequests);
router.get("/leaves/:id", requestsController.getUserLeaveRequests);

module.exports = router;
