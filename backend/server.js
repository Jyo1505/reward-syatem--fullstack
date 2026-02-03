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

// ✅ Modern CORS (Node 18+ / 20+ / 22 compatible)
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // allow Postman / curl
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("CORS not allowed"));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
  credentials: false
}));

app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/answers", answerRoutes);
app.use("/api/transfers", transferRoutes);
app.use("/api/users", userRoutes);
app.use("/api/questions", questionRoutes);

// health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK" });
});

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
