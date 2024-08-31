const express = require("express");
const {getUserProfile,updateUserProfile,getUserEvent,createUserProfile,saveEvent,joinEvent} = require("../controllers/ControllerUserProfile.js");

const router = express.Router();

//http://localhost:8001/user/profile?userID=
router.get('/profile', getUserProfile);

//http://localhost:8001/user/update?userID=
router.post('/update', updateUserProfile);

//http://localhost:8001/user/userEvent?userID=Si9X1z0v8EXP2312FYG0
router.get('/userEvent', getUserEvent);

//http://localhost:8001/user/createUser
router.post('/createUser', createUserProfile);

//http://localhost:8001/user/saveEvent?userID=Si9X1z0v8EXP2312FYG0
router.post('/saveEvent', saveEvent);

//http://localhost:8001/user/joinEvent?userID=Si9X1z0v8EXP2312FYG0
router.post('/joinEvent', joinEvent);

module.exports = router;