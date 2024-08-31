const express = require("express");
const { markerUpdate, createEvent,getMarkers, updateMarkerTime } = require("../controllers/markerUpdateController.js");

const router = express.Router();

router.post('/', markerUpdate);

router.post('/createEvent', createEvent);

router.get('/marker', getMarkers);

router.post('/wait', updateMarkerTime)

module.exports = router;