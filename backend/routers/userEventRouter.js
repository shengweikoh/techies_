const express = require("express");
const {getUserEvents} = require("../controllers/getUserEventsController.js/index.js");

const router = express.Router();

router.get('/', getUserEvents);

module.exports = router;