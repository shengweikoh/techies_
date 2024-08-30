const express = require("express");
const {getUserProfile,updateUserProfile} = require("../controllers/ControllerUserProfile.js");

const router = express.Router();

router.get('/', getUserProfile);

route.get('/update', updateUserProfile);

module.exports = router;