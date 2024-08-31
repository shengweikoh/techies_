const express = require("express");
const { updateEventCount } = require("../controllers/countController.js");

const router = express.Router();

router.patch('/count', updateEventCount);

module.exports = router;
