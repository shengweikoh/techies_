const express = require("express");
const {getStaffProfile,updateStaffProfile,getStaffEvent,createStaffProfile} = require("../controllers/ControllerStaffProfile.js");

const router = express.Router();

router.get('/', getStaffProfile);

router.get('/update', updateStaffProfile);

router.get('/staffEvent', getStaffEvent);

router.get('/createStaff', createStaffProfile);

module.exports = router;