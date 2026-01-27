import express from 'express';
import multer from 'multer';
import { parseResume } from '../utils/resumeParser.js';
import { analyzeWithGemini } from '../utils/gemini.js';
import { rolePrompts } from '../utils/prompts.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/analyze', upload.single('resume'), async (req, res) => {
  try {
    const { role } = req.body;
    const resumeText = await parseResume(req.file.path);

    const promptBuilder = rolePrompts[role];
    if (!promptBuilder) {
      return res.status(400).json({ error: 'Invalid role selected' });
    }

    const prompt = promptBuilder(resumeText);
    const analysis = await analyzeWithGemini(prompt);

    res.json({
      role,
      analysis
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Resume analysis failed' });
  }
});

export default router;
