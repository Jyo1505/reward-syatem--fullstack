const db = require("../config/db");

exports.transferPoints = (req, res) => {
  let { sender, receiver, points } = req.body;

  sender = Number(sender);
  receiver = Number(receiver);
  points = Number(points);

  if (!sender || !receiver || !points || points <= 0) {
    return res.status(400).json({ msg: "Invalid transfer data" });
  }

  // Check sender
  db.query("SELECT points FROM users WHERE id=?", [sender], (e1, r1) => {
    if (r1.length === 0)
      return res.status(404).json({ msg: "Sender not found" });

    if (r1[0].points <= 10)
      return res.status(400).json({ msg: "You must have more than 10 points to transfer" });

    if (r1[0].points < points)
      return res.status(400).json({ msg: "Insufficient balance" });

    // Check receiver
    db.query("SELECT id FROM users WHERE id=?", [receiver], (e2, r2) => {
      if (r2.length === 0)
        return res.status(404).json({ msg: "Receiver user does not exist" });

      // Do transfer
      db.query("UPDATE users SET points = points - ? WHERE id=?", [points, sender]);
      db.query("UPDATE users SET points = points + ? WHERE id=?", [points, receiver]);

      db.query(
        "INSERT INTO transfers(sender_id,receiver_id,points) VALUES(?,?,?)",
        [sender, receiver, points]
      );

      res.json({ msg: "✅ Transfer successful" });
    });
  });
};
