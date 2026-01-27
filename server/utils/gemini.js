import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || 'your-api-key-here');

export const analyzeResume = async (resumeText) => {
  try {
    if (!process.env.GOOGLE_API_KEY) {
      return "AI analysis disabled. Please add GOOGLE_API_KEY to .env file.\n\nMock Analysis:\nStrengths: Strong technical skills, good communication\nWeaknesses: Need more project details\nSuggested Roles: Frontend Developer, Full Stack Engineer";
    }
    
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const prompt = `Analyze this resume professionally and provide:
    1. Top 3 strengths
    2. Top 3 areas for improvement
    3. 3 most suitable job roles
    4. 2-3 key skills to develop
    
    Resume: ${resumeText.substring(0, 4000)}`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini API Error:', error);
    return `AI Analysis Error: ${error.message}. Falling back to mock analysis.\n\nStrengths: Technical expertise, Problem-solving\nWeaknesses: Could add more metrics\nRoles: Software Engineer, Web Developer`;
  }
};

export const generateCoverLetter = async (resumeText, jobDescription) => {
  try {
    if (!process.env.GOOGLE_API_KEY) {
      return `Dear Hiring Manager,\n\nI am writing to express my interest in the position. Based on my experience and skills, I believe I would be a great fit for your team.\n\n[Mock Cover Letter - Add GOOGLE_API_KEY to .env for AI generation]\n\nSincerely,\n[Your Name]`;
    }
    
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const prompt = `Generate a professional cover letter using this resume for this job description.
    
    RESUME HIGHLIGHTS:
    ${resumeText.substring(0, 2000)}
    
    JOB DESCRIPTION:
    ${jobDescription.substring(0, 2000)}
    
    Create a 3-4 paragraph cover letter that:
    1. Starts with proper salutation
    2. Mentions the specific position
    3. Highlights 2-3 relevant skills/experiences
    4. Shows enthusiasm for the company/role
    5. Ends professionally`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Cover letter generation error:', error);
    return 'Error generating cover letter. Please try again.';
  }
};

export default { analyzeResume, generateCoverLetter };