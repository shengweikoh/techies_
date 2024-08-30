const express = require("express");
const {getAdminProfile, updateAdminProfile, getAdminEvent, createAdminProfile} = require("../controllers/ControllerAdminProfile.js");

const router = express.Router();

router.get('/', getAdminProfile);

router.get('/update', updateAdminProfile);

router.get('/adminEvent', getAdminEvent);

router.get('/createAdmin', createAdminProfile)

module.exports = router;