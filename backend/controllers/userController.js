const db = require("../config/db");

exports.getProfile = (req, res) => {
  const { id } = req.params;
  db.query("SELECT name,email,points FROM users WHERE id=?", [id],
    (err, result) => res.json(result[0])
  );
};
exports.getAllUsers = (req, res) => {
  const { id } = req.params; // logged in user id

  db.query(
    "SELECT id, name FROM users WHERE id != ?",
    [id],
    (err, result) => {
      if (err) return res.status(500).json({ msg: "Server error" });
      res.json(result);
    }
  );
};
