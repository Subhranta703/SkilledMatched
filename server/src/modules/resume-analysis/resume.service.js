import { analyzeResumeWithAI, getImprovementSuggestions } from './resume.prompts.js';
import { extractResumeSections, calculateResumeScore } from './resume.utils.js';

export class ResumeAnalysisService {
  
  // Analyze uploaded resume
  async analyzeResume(resumeText, fileName) {
    try {
      console.log(`📄 Analyzing resume: ${fileName || 'Unknown'}`);
      
      // Extract structured data
      const extractedData = extractResumeSections(resumeText);
      
      // Get AI analysis
      const aiAnalysis = await analyzeResumeWithAI(resumeText);
      
      // Calculate score
      const score = calculateResumeScore(extractedData);
      
      // Get improvement suggestions
      const suggestions = getImprovementSuggestions(extractedData, aiAnalysis);
      
      // Get job matches
      const jobMatches = this.matchJobs(extractedData.skills || []);
      
      return {
        success: true,
        data: {
          metadata: {
            fileName,
            wordCount: resumeText.split(/\s+/).length,
            characterCount: resumeText.length,
            analysisDate: new Date().toISOString()
          },
          extractedData,
          aiAnalysis: this.parseAIResponse(aiAnalysis),
          score,
          suggestions,
          jobMatches,
          rawText: resumeText.substring(0, 500) // First 500 chars for preview
        }
      };
      
    } catch (error) {
      console.error('Resume analysis error:', error);
      throw new Error(`Analysis failed: ${error.message}`);
    }
  }
  
  // Match skills to job roles
  matchJobs(skills) {
    const jobRoles = {
      'Frontend Developer': ['HTML', 'CSS', 'JavaScript', 'React', 'Vue', 'Angular'],
      'Backend Developer': ['Node.js', 'Python', 'Java', 'C#', 'PHP', 'Database'],
      'Full Stack Developer': ['React', 'Node.js', 'MongoDB', 'Express', 'REST API'],
      'DevOps Engineer': ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Linux'],
      'Data Scientist': ['Python', 'Machine Learning', 'SQL', 'Statistics', 'R'],
      'UI/UX Designer': ['Figma', 'Adobe XD', 'User Research', 'Wireframing', 'Prototyping']
    };
    
    const matches = [];
    
    for (const [role, requiredSkills] of Object.entries(jobRoles)) {
      const userSkills = skills.map(s => s.toLowerCase());
      const matchedSkills = requiredSkills.filter(skill => 
        userSkills.some(userSkill => userSkill.includes(skill.toLowerCase()))
      );
      
      const matchPercentage = Math.round((matchedSkills.length / requiredSkills.length) * 100);
      
      if (matchPercentage > 30) { // At least 30% match
        matches.push({
          role,
          matchScore: matchPercentage,
          matchedSkills,
          missingSkills: requiredSkills.filter(s => !matchedSkills.includes(s)),
          description: this.getRoleDescription(role)
        });
      }
    }
    
    // Sort by match score (highest first)
    return matches.sort((a, b) => b.matchScore - a.matchScore);
  }
  
  getRoleDescription(role) {
    const descriptions = {
      'Frontend Developer': 'Builds user interfaces and client-side applications',
      'Backend Developer': 'Develops server-side logic and database architecture',
      'Full Stack Developer': 'Handles both frontend and backend development',
      'DevOps Engineer': 'Manages deployment, infrastructure, and CI/CD pipelines',
      'Data Scientist': 'Analyzes data and builds machine learning models',
      'UI/UX Designer': 'Designs user interfaces and improves user experience'
    };
    
    return descriptions[role] || 'Technical role requiring problem-solving skills';
  }
  
  parseAIResponse(aiText) {
    try {
      // Parse structured AI response
      const sections = {
        strengths: [],
        weaknesses: [],
        suggestions: [],
        summary: ''
      };
      
      // Simple parsing logic
      const lines = aiText.split('\n');
      let currentSection = '';
      
      lines.forEach(line => {
        if (line.toLowerCase().includes('strength')) {
          currentSection = 'strengths';
        } else if (line.toLowerCase().includes('weakness') || line.toLowerCase().includes('improvement')) {
          currentSection = 'weaknesses';
        } else if (line.toLowerCase().includes('suggestion') || line.toLowerCase().includes('recommend')) {
          currentSection = 'suggestions';
        } else if (line.trim().startsWith('-') || line.trim().startsWith('•')) {
          const item = line.replace(/^[-•]\s*/, '').trim();
          if (currentSection && item) {
            sections[currentSection].push(item);
          }
        } else if (line.trim() && !currentSection) {
          sections.summary += line + ' ';
        }
      });
      
      return sections;
      
    } catch (error) {
      return {
        strengths: ['Strong technical background'],
        weaknesses: ['Could use more quantifiable achievements'],
        suggestions: ['Add more specific project details'],
        summary: 'Competent technical profile with room for improvement'
      };
    }
  }
}

export default new ResumeAnalysisService();