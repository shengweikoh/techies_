const express = require("express");
const { markerUpdate } = require("../controllers/markerUpdateController.js");

const router = express.Router();

router.post('/', markerUpdate);

module.exports = router;