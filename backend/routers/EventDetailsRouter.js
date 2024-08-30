const express = require("express");
const { getEventDetails,createEvent } = require("../controllers/getEventController.js/index.js");

const router = express.Router();

router.get('/', getEventDetails);

route.get('/create', createEvent)

module.exports = router;