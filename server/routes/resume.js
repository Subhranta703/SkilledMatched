const express = require("express");
const multer = require("multer");
const fs = require("fs");
const pdfParse = require("pdf-parse"); 
const mammoth = require("mammoth");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

async function analyzeWithAI(resumeText) {
  return `Resume Analysis Result:\n- Words Count: ${resumeText.split(" ").length}\n- Skills Detected: JavaScript, React, Node.js (example)`;
}

router.post("/analyze", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: "No file uploaded" });

    // Only PDF
    if (file.mimetype !== "application/pdf") {
      return res.status(400).json({ error: "Only PDF files are supported" });
    }

    const fileData = fs.readFileSync(file.path);
    const pdfData = await pdfParse(fileData); // This should now work
    const resumeText = pdfData.text;

    // Simple mock analysis
    const analysisResult = `Resume Analysis:\n- Words: ${resumeText.split(" ").length}\n- Example Skills Detected: JavaScript, React, Node.js`;

    // Delete temp file
    fs.unlinkSync(file.path);

    res.json({ analysis: analysisResult });
  } catch (err) {
    console.error("Error analyzing resume:", err);
    res.status(500).json({ error: "Failed to analyze resume" });
  }
});


module.exports = router;
