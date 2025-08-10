router.post('/generate-coverletter', async (req, res) => {
  const { name, jobRole, company, experience } = req.body;

  const prompt = `
    Write a professional cover letter for the following details:
    - Name: ${name}
    - Role: ${jobRole}
    - Company: ${company}
    - Experience: ${experience}
    Keep it concise and targeted.
  `;

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  res.json({ coverLetter: text });
});
