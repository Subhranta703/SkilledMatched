// /api/generate-resume.js
import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post('/generate-resume', async (req, res) => {
  const { name, education, experience, skills } = req.body;

  const prompt = `
    Generate a professional resume using the following details:
    Name: ${name}
    Education: ${education}
    Experience: ${experience}
    Skills: ${skills}
    Format it in a clean, modern layout.
  `;

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  res.json({ resume: text });
});

export default router;
