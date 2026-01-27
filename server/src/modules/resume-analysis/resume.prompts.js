import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

export const analyzeResumeWithAI = async (resumeText) => {
  try {
    if (!process.env.GOOGLE_API_KEY || process.env.GOOGLE_API_KEY.includes('your_api_key')) {
      return this.getMockAnalysis(resumeText);
    }
    
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const prompt = `Analyze this resume professionally and provide a structured analysis in the following format:

RESUME SUMMARY:
[2-3 sentence summary of the candidate's profile]

KEY STRENGTHS:
- [Strength 1: specific and actionable]
- [Strength 2: specific and actionable] 
- [Strength 3: specific and actionable]

AREAS FOR IMPROVEMENT:
- [Improvement 1: constructive feedback]
- [Improvement 2: constructive feedback]
- [Improvement 3: constructive feedback]

TOP 3 JOB ROLE MATCHES:
1. [Role 1]: [Why it's a good fit]
2. [Role 2]: [Why it's a good fit]
3. [Role 3]: [Why it's a good fit]

IMMEDIATE ACTION ITEMS:
- [Action 1: specific improvement to make]
- [Action 2: specific improvement to make]
- [Action 3: specific improvement to make]

Resume Text:
${resumeText.substring(0, 6000)}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
    
  } catch (error) {
    console.error('AI Analysis Error:', error);
    return this.getMockAnalysis(resumeText);
  }
};

export const getImprovementSuggestions = (extractedData, aiAnalysis) => {
  const suggestions = [];
  
  // Check for common issues
  if (!extractedData.contact || !extractedData.contact.email) {
    suggestions.push({
      type: 'critical',
      title: 'Add Contact Information',
      description: 'Include email and phone number at the top of your resume',
      fix: 'Add a clear contact section with email, phone, and LinkedIn profile'
    });
  }
  
  if (!extractedData.experience || extractedData.experience.length === 0) {
    suggestions.push({
      type: 'important',
      title: 'Add Work Experience',
      description: 'Resume lacks work experience section',
      fix: 'List previous positions with bullet points highlighting achievements'
    });
  }
  
  if (!extractedData.skills || extractedData.skills.length < 5) {
    suggestions.push({
      type: 'improvement',
      title: 'Expand Skills Section',
      description: 'Skills section could be more comprehensive',
      fix: 'Add technical skills, tools, and soft skills. Categorize them (e.g., Programming, Tools, Soft Skills)'
    });
  }
  
  // Check for quantifiable achievements
  const hasMetrics = extractedData.experience?.some(exp => 
    /\d+%|\$|\d+\s+(increase|reduce|save)/i.test(exp)
  );
  
  if (!hasMetrics) {
    suggestions.push({
      type: 'enhancement',
      title: 'Add Quantifiable Achievements',
      description: 'Use numbers to demonstrate impact',
      fix: 'Add metrics like "Increased performance by 30%" or "Reduced costs by $10,000"'
    });
  }
  
  return suggestions;
};

// Mock analysis for testing without API key
export const getMockAnalysis = (resumeText) => {
  const wordCount = resumeText.split(/\s+/).length;
  const hasExperience = /experience|work|employment/i.test(resumeText);
  const hasEducation = /education|degree|university/i.test(resumeText);
  const hasSkills = /skill|technology|framework|language/i.test(resumeText);
  
  return `
RESUME SUMMARY:
${wordCount > 100 ? 'Detailed resume with good content structure.' : 'Brief resume that needs more detail.'} 
${hasExperience ? 'Includes relevant work experience.' : 'Work experience section could be expanded.'}

KEY STRENGTHS:
- Clear communication of technical concepts
- Good foundational knowledge in mentioned technologies
- Professional formatting and structure

AREAS FOR IMPROVEMENT:
- ${hasSkills ? 'Could categorize skills better' : 'Skills section needs expansion'}
- ${hasExperience ? 'Add more quantifiable achievements' : 'Include work experience with bullet points'}
- ${wordCount < 200 ? 'Resume is too brief - add more details' : 'Consider adding a professional summary'}

TOP 3 JOB ROLE MATCHES:
1. Software Developer: Good technical foundation suitable for entry-level positions
2. IT Specialist: General technical skills applicable to various IT roles
3. Technical Support: Problem-solving abilities demonstrated in resume

IMMEDIATE ACTION ITEMS:
- Add specific project examples with technologies used
- Include measurable achievements with numbers/percentages
- Tailor resume for specific job applications
`;
};