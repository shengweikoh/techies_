const express = require("express");
const { getEventDetails } = require("../controllers/ControllerEventDetail.js"); // Ensure this import path is correct

const router = express.Router();

// Define route for getting event details
// http://localhost:8001/controllers/ControllerEventDetail?eventID=NPhVR0foK3vl9iDzPoxn
router.get('/', getEventDetails); // Correctly pass the imported function

module.exports = router;
