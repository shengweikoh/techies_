const express = require("express");
const {getStaffProfile,updateStaffProfile,getStaffEvent,createStaffProfile} = require("../controllers/ControllerGetStaff.js");

const router = express.Router();

router.get('/', getStaffProfile);

router.get('/update', updateStaffProfile);

router.get('/staffEvent', getStaffEvent);

route.get('/createStaff', createStaffProfile);

module.exports = router;