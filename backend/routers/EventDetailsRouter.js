

const express = require("express");
const { getEventDetails } = require("../controllers/ControllerEventDetail.js"); // Ensure this import path is correct

const router = express.Router();

// Define route for getting event details
router.get('/', getEventDetails); // Correctly pass the imported function

module.exports = router;
