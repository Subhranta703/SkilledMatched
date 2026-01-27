import express from "express";

const router = express.Router();

// Test endpoint
router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Resume analyzer API is working!",
    timestamp: new Date().toISOString()
  });
});

// Analyze text resume
router.post("/analyze-text", (req, res) => {
  try {
    const { resumeText } = req.body;
    
    if (!resumeText) {
      return res.status(400).json({ 
        success: false, 
        error: "Resume text is required" 
      });
    }
    
    // Simple analysis logic
    const wordCount = resumeText.split(/\s+/).length;
    const hasEmail = /\S+@\S+\.\S+/.test(resumeText);
    const hasPhone = /(\+\d{1,3}[-.]?)?\(?\d{3}\)?[-.]?\d{3}[-.]?\d{4}/.test(resumeText);
    
    // Calculate score based on content
    let score = 50;
    if (hasEmail) score += 10;
    if (hasPhone) score += 10;
    if (wordCount > 100) score += 15;
    if (wordCount > 200) score += 10;
    if (/experience|work|employment/i.test(resumeText)) score += 10;
    if (/skill|technology|framework/i.test(resumeText)) score += 10;
    
    score = Math.min(score, 95);
    
    res.json({
      success: true,
      analysis: {
        score: score,
        strengths: [
          "Good technical foundation",
          "Clear communication style",
          "Professional formatting"
        ].slice(0, 2 + Math.floor(score/30)),
        weaknesses: [
          "Could add more quantifiable achievements",
          "Consider including project links",
          "Tailor skills to specific job roles"
        ].slice(0, 3 - Math.floor(score/30)),
        jobMatches: [
          { role: "Software Developer", match: Math.min(score + 10, 95), reason: "Strong technical background" },
          { role: "Web Developer", match: Math.min(score + 5, 90), reason: "Web technologies mentioned" },
          { role: "Full Stack Engineer", match: Math.min(score, 85), reason: "Versatile skill set" }
        ],
        suggestions: [
          "Add metrics to your achievements (e.g., 'Improved performance by 30%')",
          "Include specific technologies used in projects",
          "Add GitHub or portfolio links"
        ]
      },
      stats: {
        wordCount,
        hasEmail,
        hasPhone,
        analyzedAt: new Date().toISOString()
      }
    });
    
  } catch (error) {
    console.error("Analysis error:", error);
    res.status(500).json({ 
      success: false, 
      error: "Failed to analyze resume" 
    });
  }
});

export default router;