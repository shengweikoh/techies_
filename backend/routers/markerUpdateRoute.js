const express = require("express");
const { markerUpdate, createEvent } = require("../controllers/markerUpdateController.js");

const router = express.Router();

router.post('/', markerUpdate);

router.post('/createEvent', createEvent);

module.exports = router;