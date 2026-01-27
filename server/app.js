import express from "express";
import cors from "cors";
import resumeRoutes from "./src/modules/resume-analysis/resume.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/resume", resumeRoutes);

app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Server is running",
    time: new Date().toISOString()
  });
});

app.get("/", (req, res) => {
  res.json({
    message: "SkillMatched API",
    endpoints: [
      "GET /api/health",
      "GET /api/resume/test",
      "POST /api/resume/analyze-text"
    ]
  });
});

app.use("*", (req, res) => {
  res.status(404).json({ error: "Not found" });
});

export default app;
