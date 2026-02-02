const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/answerController");

router.post("/add", ctrl.addAnswer);
router.get("/:questionId", ctrl.getAnswersByQuestion);
router.put("/upvote/:answerId", ctrl.upvote);
router.delete("/delete/:id", ctrl.deleteAnswer); // 👈 REQUIRED
router.put("/downvote/:answerId", ctrl.downvote);

module.exports = router;
