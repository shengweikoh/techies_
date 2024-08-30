const express = require("express");
const {getAdminProfile, updateAdminProfile, getAdminEvent, createAdminProfile} = require("../controllers/ControllerAdminProfile.js");

const router = express.Router();

// http://localhost:8001/admin/profile?adminID=
router.get('/profile', getAdminProfile);

// http://localhost:8001/admin/update?adminID=
router.post('/update', updateAdminProfile);

// http://localhost:8001/admin/adminEvent?adminID=
router.get('/adminEvent', getAdminEvent);

router.post('/createAdmin', createAdminProfile)

module.exports = router;