const express = require("express");
const {getStaffProfile,updateStaffProfile,getStaffEvent} = require("../controllers/ControllerGetStaff.js");

const router = express.Router();

router.get('/', getStaffProfile);

router.get('/update', updateStaffProfile);

router.get('/staffEvent', getStaffEvent);

module.exports = router;