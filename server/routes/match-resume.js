router.post('/match-resume', async (req, res) => {
  const { resumeText, jobDescription } = req.body;

  const prompt = `
    Compare this resume to the job description and suggest how well it fits, and what improvements are needed.
    Resume: ${resumeText}
    Job Description: ${jobDescription}
  `;

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  res.json({ matchFeedback: text });
});
