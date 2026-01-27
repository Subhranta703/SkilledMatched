// server/routes/resume.js - WITH FILE UPLOAD
import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Configure file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF and Word documents are allowed.'));
    }
  }
});

// Test endpoint
router.get('/test', (req, res) => {
  res.json({
    success: true,
    message: 'Resume analyzer API is working!',
    timestamp: new Date().toISOString()
  });
});

// Analyze text resume with role perspective
router.post('/analyze-text', (req, res) => {
  try {
    const { resumeText, role = 'HR' } = req.body;
    
    if (!resumeText) {
      return res.status(400).json({ error: 'Resume text is required' });
    }

    // Calculate score
    let score = calculateScore(resumeText, role);
    const analysis = generateRoleBasedAnalysis(resumeText, role, score);
    
    res.json({
      success: true,
      analysis: analysis,
      stats: {
        wordCount: resumeText.split(/\s+/).length,
        hasEmail: /\S+@\S+\.\S+/.test(resumeText),
        hasPhone: /(\+\d{1,3}[-.]?)?\(?\d{3}\)?[-.]?\d{3}[-.]?\d{4}/.test(resumeText),
        analyzedAt: new Date().toISOString(),
        rolePerspective: role
      }
    });
    
  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Upload and analyze resume file
router.post('/upload', upload.single('resume'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const role = req.body.role || 'HR';
    
    // For demo purposes, create mock text from file info
    // In production, you would parse the actual file content
    const mockText = `Uploaded Resume: ${req.file.originalname}
File Type: ${req.file.mimetype}
File Size: ${req.file.size} bytes
Uploaded at: ${new Date().toISOString()}

[This is a mock analysis. In production, the actual resume content would be parsed and analyzed.]`;

    const score = calculateScore(mockText, role);
    const analysis = generateRoleBasedAnalysis(mockText, role, score);
    
    res.json({
      success: true,
      message: 'File uploaded successfully',
      filename: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size,
      mimetype: req.file.mimetype,
      analysis: analysis,
      stats: {
        wordCount: mockText.split(/\s+/).length,
        hasEmail: false, // Mock value
        hasPhone: false, // Mock value
        analyzedAt: new Date().toISOString(),
        rolePerspective: role
      }
    });
    
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Helper functions
function calculateScore(resumeText, role) {
  let score = 50;
  
  const wordCount = resumeText.split(/\s+/).length;
  const hasEmail = /\S+@\S+\.\S+/.test(resumeText);
  const hasPhone = /(\+\d{1,3}[-.]?)?\(?\d{3}\)?[-.]?\d{3}[-.]?\d{4}/.test(resumeText);
  const hasExperience = /experience|work|employment/i.test(resumeText);
  const hasSkills = /skill|technology|framework|language/i.test(resumeText);
  const hasProjects = /project|github|portfolio|built/i.test(resumeText);
  
  // Base scoring
  if (hasEmail) score += 10;
  if (hasPhone) score += 10;
  if (hasExperience) score += 15;
  if (hasSkills) score += 15;
  if (hasProjects) score += 10;
  if (wordCount > 100) score += 10;
  if (wordCount > 200) score += 5;
  
  // Role-specific adjustments
  switch(role) {
    case 'SDE':
      if (/javascript|react|node|python|java|typescript/i.test(resumeText)) score += 15;
      if (/github|git|docker|aws|database|api/i.test(resumeText)) score += 10;
      break;
    case 'HR':
      if (/communication|teamwork|leadership|collaboration/i.test(resumeText)) score += 15;
      if (/achievement|accomplishment|result|metric|improved|increased/i.test(resumeText)) score += 10;
      break;
    case 'MANAGER':
      if (/lead|manage|team|mentor|supervise/i.test(resumeText)) score += 15;
      if (/budget|cost|efficiency|productivity|deadline/i.test(resumeText)) score += 10;
      break;
    case 'CEO':
      if (/initiative|entrepreneur|innovate|startup|founder/i.test(resumeText)) score += 15;
      if (/impact|scale|growth|revenue|profit|customer/i.test(resumeText)) score += 10;
      break;
  }
  
  return Math.min(Math.max(score, 0), 95);
}

function generateRoleBasedAnalysis(resumeText, role, score) {
  const roleSpecificAnalysis = {
    'HR': {
      strengths: ['Clear career progression', 'Relevant experience highlighted', 'Professional format'],
      weaknesses: ['Could tailor more to job descriptions', 'Add more industry keywords', 'Include measurable achievements'],
      suggestions: [
        'Tailor skills to match job description keywords',
        'Quantify achievements with numbers and percentages',
        'Highlight transferable skills for different roles'
      ]
    },
    'SDE': {
      strengths: ['Technical depth evident', 'Project experience detailed', 'Tools and frameworks listed'],
      weaknesses: ['Could add GitHub links', 'Need specific version numbers', 'Missing code samples'],
      suggestions: [
        'Add links to GitHub repositories and live projects',
        'Specify exact technologies and versions used',
        'Include code snippets or architecture diagrams'
      ]
    },
    'MANAGER': {
      strengths: ['Leadership experience shown', 'Team collaboration evident', 'Project delivery mentioned'],
      weaknesses: ['Need more metrics on team impact', 'Could show budget management', 'Missing stakeholder management'],
      suggestions: [
        'Add metrics showing team performance improvements',
        'Include budget and resource management experience',
        'Show stakeholder communication and reporting'
      ]
    },
    'CEO': {
      strengths: ['Initiative and drive shown', 'Problem-solving approach clear', 'Business awareness evident'],
      weaknesses: ['Need more business impact metrics', 'Could show innovation examples', 'Missing risk management'],
      suggestions: [
        'Focus on business outcomes and ROI of your work',
        'Show innovative approaches to solving problems',
        'Include examples of calculated risks and results'
      ]
    }
  };
  
  const analysis = roleSpecificAnalysis[role] || roleSpecificAnalysis['HR'];
  
  return {
    score: score,
    strengths: analysis.strengths,
    weaknesses: analysis.weaknesses,
    jobMatches: generateJobMatches(resumeText, score),
    suggestions: analysis.suggestions
  };
}

function generateJobMatches(resumeText, score) {
  const matches = [];
  
  if (/javascript|react|node|frontend|typescript/i.test(resumeText)) {
    matches.push({
      role: 'Frontend Developer',
      match: Math.min(score + 15, 95),
      reason: 'Strong JavaScript and modern framework skills'
    });
  }
  
  if (/node|python|java|backend|api|server|database/i.test(resumeText)) {
    matches.push({
      role: 'Backend Developer',
      match: Math.min(score + 10, 90),
      reason: 'Solid backend development and database experience'
    });
  }
  
  if (/full.?stack|mern|mean|react.*node|python.*django/i.test(resumeText)) {
    matches.push({
      role: 'Full Stack Developer',
      match: Math.min(score + 5, 85),
      reason: 'Versatile across frontend and backend technologies'
    });
  }
  
  // Add at least 2 matches
  if (matches.length < 2) {
    matches.push({
      role: 'Software Engineer',
      match: Math.min(score + 8, 88),
      reason: 'Strong technical foundation and problem-solving skills'
    });
  }
  
  if (matches.length < 3) {
    matches.push({
      role: 'Web Developer',
      match: Math.min(score + 3, 80),
      reason: 'Good web development fundamentals and experience'
    });
  }
  
  return matches.slice(0, 3); // Return top 3 matches
}

export default router;