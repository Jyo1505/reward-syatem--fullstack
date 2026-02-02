const router = require("express").Router();
const ctrl = require("../controllers/userController");

router.get("/:id", ctrl.getProfile);
router.get("/list/:id", ctrl.getAllUsers);

module.exports = router;
