require("dotenv").config();
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const answerRoutes = require("./routes/answer.routes");
const transferRoutes = require("./routes/transfer.routes");
const userRoutes = require("./routes/user.routes");
const questionRoutes = require("./routes/question.routes");

const app = express();

// ✅ CORS (Vercel + Local)
app.use(cors({
  origin: [
    "http://localhost:5173",
    process.env.FRONTEND_URL
  ],
  credentials: true
}));

app.use(express.json());

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/answers", answerRoutes);
app.use("/api/transfers", transferRoutes);
app.use("/api/users", userRoutes);
app.use("/api/questions", questionRoutes);

// Health check (IMPORTANT for Render)
app.get("/api/health", (req, res) => {
  res.json({ status: "OK" });
});

// ✅ Dynamic port (Render requirement)
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
