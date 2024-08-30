const express = require("express");
const {getUserProfile,updateUserProfile,getUserEvent} = require("../controllers/ControllerUserProfile.js");

const router = express.Router();

router.get('/', getUserProfile);

route.get('/update', updateUserProfile);

route.get('/userEvent', getUserEvent);

module.exports = router;