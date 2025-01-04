const express = require("express");
const router = express.Router();

const { getvolunteers } = require("../controllers/volunteer.controller");

router.get("/", getvolunteers);

module.exports = router;