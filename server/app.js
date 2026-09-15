

import express from "express";
import cors from "cors";
import morgan from "morgan";

import resumeRoutes from "./routes/resume.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Server is running",
  });
});

app.use("/api/resume", resumeRoutes);

app.use((req, res) => {
  res.status(404).json({
    error: "Endpoint not found",
  });
});

export default app;















// import express from 'express';
// import cors from 'cors';
// import morgan from 'morgan';
// 
// import resumeRoutes from './routes/resume.js';
// 
// const app = express();
// 
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     credentials: true,
//   })
// );
// 
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(morgan('dev'));
// 
// // Health check
// app.get('/api/health', (req, res) => {
//   res.json({
//     success: true,
//     status: 'OK',
//     service: 'SkillMatched API',
//     version: '1.0.0',
//     timestamp: new Date().toISOString(),
//   });
// });
// 
// // Resume routes
// app.use('/api/resume', resumeRoutes);
// console.log('✅ Resume routes loaded');
// 
// // 404 handler
// app.use((req, res) => {
//   res.status(404).json({
//     success: false,
//     error: 'Endpoint not found',
//   });
// });
// 
// // Error handler
// app.use((err, req, res, next) => {
//   console.error('Server Error:', err);
// 
//   res.status(500).json({
//     success: false,
//     error: err.message || 'Internal server error',
//   });
// });
// 
// export default app;