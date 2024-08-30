const express = require("express");
const { getEventDetails } = require("../controllers/ControllerEventDetail.js");

const router = express.Router();

router.get('/', getEventDetails);

module.exports = router;