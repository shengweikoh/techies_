const express = require("express");
const { getEventDetails } = require("../controllers/getEventController.js/index.js");

const router = express.Router();

router.get('/', getEventDetails);

module.exports = router;