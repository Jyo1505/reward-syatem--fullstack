const db = require("../config/db");
const bcrypt = require("bcryptjs");

exports.register = (req, res) => {
  const { name, email, password } = req.body;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;

if (!emailRegex.test(email)) {
  return res.status(400).json({ msg: "Invalid email format" });
}

const domain = email.split("@")[1].toLowerCase();

const allowedDomains = [
  "gmail.com",
  "yahoo.com",
  "outlook.com",
  "hotmail.com",
  "rediffmail.com"
];

if (
  !allowedDomains.includes(domain) &&
  !domain.endsWith(".ac.in") &&
  !domain.endsWith(".edu")
) {
  return res.status(400).json({
    msg: "Please use a valid email domain (gmail.com, yahoo.com, college mail, etc.)"
  });
}

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;


  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      msg: "Password must be 8+ chars with upper, lower and number"
    });
  }

  db.query("SELECT * FROM users WHERE email=?", [email], async (err, result) => {
    if (result.length > 0)
      return res.status(400).json({ msg: "User already exists" });

    const bcrypt = require("bcryptjs");
    const hashed = await bcrypt.hash(password, 10);

    db.query(
      "INSERT INTO users(name,email,password) VALUES(?,?,?)",
      [name, email, hashed],
      () => res.json({ msg: "Registered successfully" })
    );
  });
};


exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email=?", [email], async (err, result) => {
    if (result.length == 0)
      return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, result[0].password);
    if (!isMatch) return res.status(400).json({ msg: "Wrong password" });

    res.json({ msg: "Login success", user: result[0] });
  });
};
