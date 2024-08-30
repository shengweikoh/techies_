const express = require("express");
const {getAdminProfile} = require("../controllers/getAdminController.js/index.js");

const router = express.Router();

router.get('/', getAdminProfile);

module.exports = router;