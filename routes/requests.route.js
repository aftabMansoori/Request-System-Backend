const express = require("express");
const router = express.Router();

const requestsController = require("../controllers/requests.controller");

router.post("/video", requestsController.videoRequest);
router.post("/leave", requestsController.leaveRequest);

module.exports = router;
