const express = require("express");
const { getEventDetails } = require("../controllers/ControllerGetEvent.js");

const router = express.Router();

router.get('/', getEventDetails);

module.exports = router;