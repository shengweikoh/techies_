const express = require("express");
const {getUserProfile} = require("../controllers/ControllerGetEvent.js");

const router = express.Router();

router.get('/', getUserProfile);

module.exports = router;