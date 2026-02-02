const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/transferController");

router.post("/send", ctrl.transferPoints);

module.exports = router;   // 👈 must be present
