const express = require("express");
const {getStaff} = require("../controllers/ControllerGetStaff.js");

const router = express.Router();

router.get('/', getStaff);

module.exports = router;