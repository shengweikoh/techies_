const express = require("express");
const { getEventDetails,createEvent } = require("../controllers/ControllerEventDetail.js");

const router = express.Router();

router.get('/', getEventDetails);

router.get('/create', createEvent)

module.exports = router;