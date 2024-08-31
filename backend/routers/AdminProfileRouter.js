const express = require("express");
const {getAdminProfile, updateAdminProfile, getAdminEvent, createAdminProfile, assignEventStaff} = require("../controllers/ControllerAdminProfile.js");

const router = express.Router();

// http://localhost:8001/admin/profile?adminID=
router.get('/profile', getAdminProfile);

// http://localhost:8001/admin/update?adminID=
router.post('/update', updateAdminProfile);

// http://localhost:8001/admin/adminEvent?adminID=
router.get('/adminEvent', getAdminEvent);

// http://localhost:8001/admin/createAdmin
// {
//     "Email": "admin@example.com",
//     "Name": "John Doe",
//     "Phone": "+1234567890",
//     "IC": "S1234567S",
//   }
router.post('/createAdmin', createAdminProfile)

// http://localhost:8001/admin/assignStaff?adminID=
router.post('/assignStaff', assignEventStaff)

module.exports = router;