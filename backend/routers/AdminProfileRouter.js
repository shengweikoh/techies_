const express = require("express");
const {getAdminProfile, updateAdminProfile, getAdminEvent, createAdminProfile} = require("../controllers/ControllerAdminProfile.js");

const router = express.Router();

router.get('/', getAdminProfile);

route.get('/update', updateAdminProfile);

route.get('/adminEvent', getAdminEvent);

route.get('/createAdmin', createAdminProfile)

module.exports = router;