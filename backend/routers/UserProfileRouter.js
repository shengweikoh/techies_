const express = require("express");
const {getUserProfile} = require("../controllers/ControllerGetUser.js");

const router = express.Router();

router.get('/', getUserProfile);

module.exports = router;