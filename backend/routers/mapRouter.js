const express = require("express");
const { getMapPicture, updateMapPicture } = require("../controllers/mapController.js"); // Ensure this import path is correct

const router = express.Router();

// Define route for getting event details
router.get('/', getMapPicture);

router.post('/update', updateMapPicture);

module.exports = router;
