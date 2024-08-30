const express = require("express");
const {getUserEvents} = require("../controllers/ControllerGetUserEvents.js");

const router = express.Router();

router.get('/', getUserEvents);

module.exports = router;