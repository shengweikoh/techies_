const express = require("express");
const {getUserProfile,updateUserProfile,getUserEvent,createUserProfile} = require("../controllers/ControllerUserProfile.js");

const router = express.Router();

router.get('/', getUserProfile);

route.get('/update', updateUserProfile);

route.get('/userEvent', getUserEvent);

route.get('/createUser', createUserProfile);

module.exports = router;