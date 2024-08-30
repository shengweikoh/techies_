const express = require("express");
const {getAdmin} = require("../controllers/ControllerGetAdmin.js");

const router = express.Router();

router.get('/', getAdmin);

module.exports = router;