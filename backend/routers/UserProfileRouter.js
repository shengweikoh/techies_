const express = require("express");
const {getEvent} = require("../controllers/ControllerGetEvent.js");

const router = express.Router();

router.get('/', getEvent);

module.exports = router;