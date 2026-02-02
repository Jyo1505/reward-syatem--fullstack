const router = require("express").Router();
const ctrl = require("../controllers/questionController");

router.post("/add", ctrl.addQuestion);
router.get("/", ctrl.getAllQuestions);
router.get("/:id", ctrl.getSingleQuestion);

module.exports = router;
