require("dotenv").config();
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const answerRoutes = require("./routes/answer.routes");
const transferRoutes = require("./routes/transfer.routes");
const userRoutes = require("./routes/user.routes");
const questionRoutes = require("./routes/question.routes");

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://rewardsystemm.netlify.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
  credentials: false
}));

app.options("*", cors());
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/answers", answerRoutes);
app.use("/api/transfers", transferRoutes);
app.use("/api/users", userRoutes);
app.use("/api/questions", questionRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "OK" });
});

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
