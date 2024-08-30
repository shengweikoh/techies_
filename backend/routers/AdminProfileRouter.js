const express = require("express");
const {getAdminProfile} = require("../controllers/ControllerGetAdmin.js");

const router = express.Router();

router.get('/', getAdminProfile);

module.exports = router;