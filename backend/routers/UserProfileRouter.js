const express = require("express");
const {getUserProfile,updateUserProfile,getUserEvent,getUserJoined,createUserProfile,saveEvent,joinEvent, getUserSaved} = require("../controllers/ControllerUserProfile.js");

const router = express.Router();

//http://localhost:8001/user/profile?userID=
router.get('/profile', getUserProfile);

//http://localhost:8001/user/update?userID=
router.post('/update', updateUserProfile);

//http://localhost:8001/user/userSaved?userID=
router.get('/userSaved', getUserSaved);

//http://localhost:8001/user/userJoined?userID=
router.get('/userJoined', getUserJoined);

//http://localhost:8001/user/createUser
// {
//     "Email": "grave@example.com",
//     "Name": "John Doe",
//     "Phone": "+1234567890",
//     "EContact": "99999999",
//     "BloodType": "A",
//     "MedicalConditions": "NIL"
// }
router.post('/createUser', createUserProfile);

//http://localhost:8001/user/saveEvent?userID=
router.post('/saveEvent', saveEvent);

//http://localhost:8001/user/joinEvent?userID=
router.post('/joinEvent', joinEvent);

module.exports = router;