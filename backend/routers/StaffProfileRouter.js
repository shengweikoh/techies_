const express = require("express");
const {getStaffProfile} = require("../controllers/ControllerGetStaff.js");

const router = express.Router();

router.get('/', getStaffProfile);

module.exports = router;