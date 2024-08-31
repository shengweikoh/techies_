const express = require("express");
const { markerUpdate, createEvent,getMarkers } = require("../controllers/markerUpdateController.js");

const router = express.Router();

router.post('/', markerUpdate);

router.post('/createEvent', createEvent);

router.get('/marker', getMarkers);

module.exports = router;