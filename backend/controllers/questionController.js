const db = require("../config/db");

// Add question
exports.addQuestion = (req, res) => {
  const { user_id, title, description } = req.body;

  if (!title || !description)
    return res.status(400).json({ msg: "All fields required" });

  db.query(
    "INSERT INTO questions(user_id,title,description) VALUES(?,?,?)",
    [user_id, title, description],
    () => res.json({ msg: "Question posted successfully" })
  );
};

// Get all questions
exports.getAllQuestions = (req, res) => {
  db.query(
    "SELECT q.*, u.name FROM questions q JOIN users u ON q.user_id=u.id ORDER BY q.id DESC",
    (err, result) => res.json(result)
  );
};

// Get single question
exports.getSingleQuestion = (req, res) => {
  const { id } = req.params;

  db.query(
    "SELECT q.*, u.name FROM questions q JOIN users u ON q.user_id=u.id WHERE q.id=?",
    [id],
    (err, result) => res.json(result[0])
  );
};
