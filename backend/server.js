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
  "https://reward-syatem-fullstack.vercel.app",
  "https://www.reward-syatem-fullstack.vercel.app"
];

app.use(cors({
  origin: (origin, callback) => {

    // allow Postman, curl, mobile refresh, SSR
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    // ❗ silently block, DO NOT throw error
    console.warn("Blocked CORS origin:", origin);
    return callback(null, false);
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
