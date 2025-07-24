// server/controllers/resumeController.js
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const Resume = require('../models/Resume');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.analyzeResume = async (req, res) => {
  try {
    const { resumeText } = req.body;

    const prompt = `Analyze this resume and provide:\n1. Suggested job roles\n2. Missing skills\n3. Learning resources\n4. Resume improvements\n\nResume:\n${resumeText}`;

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // Save to DB (for dashboard)
    const saved = await Resume.create({
      resumeText,
      result: text,
    });

    res.status(200).json(text);
  } catch (err) {
    console.error('❌ Gemini API Error:', err);
    res.status(500).json({ error: 'Gemini API call failed' });
  }
};

// For dashboard
exports.getHistory = async (req, res) => {
  try {
    const history = await Resume.find().sort({ createdAt: -1 }).limit(20);
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching history' });
  }
};
