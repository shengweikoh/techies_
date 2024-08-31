const express = require("express");
const {getStaffProfile,updateStaffProfile,getStaffEvent,createStaffProfile} = require("../controllers/ControllerStaffProfile.js");

const router = express.Router();

// http://localhost:8001/staff/profile?staffID=
router.get('/profile', getStaffProfile);

// http://localhost:8001/staff/update?staffID=
router.post('/update', updateStaffProfile);

// http://localhost:8001/staff/staffEvent?staffID=
router.get('/staffEvent', getStaffEvent);

// http://localhost:8001/staff/createStaff
// {
//     "Email": "admin@example.com",
//     "Name": "John Doe",
//     "Phone": "+1234567890"
//   }
router.post('/createStaff', createStaffProfile);

module.exports = router;