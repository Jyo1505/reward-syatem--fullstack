const db = require("../config/db");

exports.addAnswer = (req, res) => {
  const { user_id, question_id, content } = req.body;

  db.query(
    "INSERT INTO answers(user_id,question_id,content) VALUES(?,?,?)",
    [user_id, question_id, content],
    () => {
      db.query("UPDATE users SET points = points + 5 WHERE id=?", [user_id]);
      res.json({ msg: "Answer added +5 points" });
    }
  );
};

exports.upvote = (req, res) => {
  const { answerId } = req.params;
  const { user_id } = req.body;

  if (!user_id) return res.status(400).json({ msg: "User required" });

  db.query(
    "INSERT INTO answer_upvotes(answer_id,user_id) VALUES(?,?)",
    [answerId, user_id],
    (err) => {

      if (err) {
        return res.status(400).json({ msg: "You already upvoted this answer" });
      }

      // increase upvote count
      db.query("UPDATE answers SET upvotes = upvotes + 1 WHERE id=?", [answerId]);

      // reward check
      db.query("SELECT * FROM answers WHERE id=?", [answerId], (e, r) => {

        const ans = r[0];

        if (ans.upvotes + 1 === 5 && ans.reward_given == 0) {
          db.query("UPDATE users SET points = points + 5 WHERE id=?", [ans.user_id]);
          db.query("UPDATE answers SET reward_given = 1 WHERE id=?", [answerId]);

          return res.json({ msg: "Upvoted 👍 Bonus +5 points awarded" });
        }

        res.json({ msg: "Upvoted 👍" });
      });
    }
  );
};


exports.getAnswersByQuestion = (req, res) => {
  const { questionId } = req.params;

  db.query(
    "SELECT a.*, u.name FROM answers a JOIN users u ON a.user_id=u.id WHERE question_id=? ORDER BY a.id DESC",
    [questionId],
    (err, result) => res.json(result)
  );
};
exports.deleteAnswer = (req, res) => {
  const answerId = req.params.id;
  const { user_id } = req.body;

  db.query("SELECT * FROM answers WHERE id=?", [answerId], (err, result) => {

    if (err) return res.status(500).json({ msg: "Server error" });

    if (result.length === 0)
      return res.status(404).json({ msg: "Answer not found" });

    if (result[0].user_id != user_id)
      return res.status(403).json({ msg: "You can delete only your own answer" });

    db.query("DELETE FROM answers WHERE id=?", [answerId], (err2) => {

      if (err2) return res.status(500).json({ msg: "Delete failed" });

      // deduct points
      db.query("UPDATE users SET points = points - 5 WHERE id=?", [user_id]);

      res.json({ msg: "✅ Answer deleted. -5 points" });
    });
  });
};

exports.downvote = (req, res) => {
  const { answerId } = req.params;
  const { user_id } = req.body;

  if (!user_id) return res.status(400).json({ msg: "User required" });

  // insert downvote record (DB blocks duplicates)
  db.query(
    "INSERT INTO answer_downvotes(answer_id,user_id) VALUES(?,?)",
    [answerId, user_id],
    (err) => {

      if (err) {
        return res.status(400).json({ msg: "You already downvoted this answer" });
      }

      // decrease upvotes count (optional, but realistic)
      db.query("UPDATE answers SET upvotes = IF(upvotes>0, upvotes-1, 0) WHERE id=?", [answerId]);

      // deduct points from answer owner
      db.query("SELECT user_id FROM answers WHERE id=?", [answerId], (e, r) => {
        const ownerId = r[0].user_id;

        db.query("UPDATE users SET points = points - 2 WHERE id=?", [ownerId]);

        res.json({ msg: "Downvoted 👎 -2 points to answer owner" });
      });
    }
  );
};


