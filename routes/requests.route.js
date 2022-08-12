const express = require("express");
const router = express.Router();

const requestsController = require("../controllers/requests.controller");

router.post("/", requestsController.createRequest);
router.get("/", requestsController.getRequests);
router.get("/:id", requestsController.getRequestsByUserId);
router.patch("/manage/:id", requestsController.manageRequest);

module.exports = router;
