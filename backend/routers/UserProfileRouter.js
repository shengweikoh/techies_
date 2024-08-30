const express = require("express");
<<<<<<< Updated upstream
const {getUserProfile,updateUserProfile,getUserEvent} = require("../controllers/ControllerUserProfile.js");
=======
const {getUserProfile} = require("../controllers/getEventController.js/index.js");
>>>>>>> Stashed changes

const router = express.Router();

router.get('/', getUserProfile);

route.get('/update', updateUserProfile);

route.get('/userEvent', getUserEvent);

module.exports = router;