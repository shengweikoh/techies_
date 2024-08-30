const express = require("express");
const { getAllEvents } = require("../controllers/homePageController.js"); // Ensure this import path is correct

const router = express.Router();

// Define route for getting event details
router.get('/', getAllEvents); // Correctly pass the imported function

module.exports = router;
