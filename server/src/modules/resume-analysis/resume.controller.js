import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import ResumeAnalysisService from './resume.service.js';
import { parseResume } from '../../utils/resumeParser.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../../uploads/'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'resume-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain'
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, DOC, DOCX, and TXT files are allowed.'));
    }
  }
});

export class ResumeController {
  
  // Upload and analyze resume file
  uploadResume = [
    upload.single('resume'),
    async (req, res) => {
      try {
        if (!req.file) {
          return res.status(400).json({
            success: false,
            error: 'No file uploaded. Please upload a resume file.'
          });
        }
        
        console.log(`📤 File uploaded: ${req.file.originalname}`);
        
        // Parse resume text from file
        const parsedData = await parseResume(req.file.buffer, req.file.mimetype);
        
        // Analyze resume
        const analysisResult = await ResumeAnalysisService.analyzeResume(
          parsedData.cleanedText,
          req.file.originalname
        );
        
        // Add file info to response
        analysisResult.data.fileInfo = {
          originalName: req.file.originalname,
          storedName: req.file.filename,
          size: req.file.size,
          mimetype: req.file.mimetype,
          uploadDate: new Date().toISOString()
        };
        
        res.status(200).json(analysisResult);
        
      } catch (error) {
        console.error('Upload controller error:', error);
        res.status(500).json({
          success: false,
          error: error.message || 'Failed to analyze resume',
          details: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
      }
    }
  ];
  
  // Analyze text resume (no file upload)
  analyzeTextResume = async (req, res) => {
    try {
      const { resumeText } = req.body;
      
      if (!resumeText || resumeText.trim().length < 50) {
        return res.status(400).json({
          success: false,
          error: 'Resume text is required and should be at least 50 characters.'
        });
      }
      
      console.log('📝 Analyzing text resume...');
      
      const analysisResult = await ResumeAnalysisService.analyzeResume(
        resumeText.trim(),
        'text-resume'
      );
      
      res.status(200).json(analysisResult);
      
    } catch (error) {
      console.error('Text analysis error:', error);
      res.status(500).json({
        success: false,
        error: error.message || 'Failed to analyze resume text'
      });
    }
  };
  
  // Get analysis history (mock - implement with DB later)
  getAnalysisHistory = async (req, res) => {
    try {
      res.json({
        success: true,
        data: {
          totalAnalyses: 0,
          recentAnalyses: [],
          message: 'Database integration required for history tracking'
        }
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };
  
  // Generate resume improvement tips
  getImprovementTips = async (req, res) => {
    try {
      const tips = [
        {
          category: 'Formatting',
          tips: [
            'Use a clean, professional font (Arial, Calibri, Times New Roman)',
            'Keep margins between 0.5" to 1"',
            'Use consistent bullet points and spacing',
            'Save as PDF to preserve formatting'
          ]
        },
        {
          category: 'Content',
          tips: [
            'Start bullet points with action verbs (Developed, Implemented, Managed)',
            'Use quantifiable metrics (increased by 30%, reduced costs by $10K)',
            'Tailor resume for each job application',
            'Include relevant keywords from job description'
          ]
        },
        {
          category: 'Sections',
          tips: [
            'Always include Contact Information, Experience, Education, and Skills',
            'Add Projects section for technical roles',
            'Include Certifications if relevant',
            'Keep resume to 1-2 pages maximum'
          ]
        }
      ];
      
      res.json({
        success: true,
        data: tips
      });
      
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };
}

export default new ResumeController();