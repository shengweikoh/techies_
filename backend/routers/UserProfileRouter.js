const express = require("express");
const {getUserProfile,updateUserProfile,getUserEvent,createUserProfile} = require("../controllers/ControllerUserProfile.js");

const router = express.Router();

router.get('/', getUserProfile);

router.get('/update', updateUserProfile);

router.get('/userEvent', getUserEvent);

router.get('/createUser', createUserProfile);

module.exports = router;