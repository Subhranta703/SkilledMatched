import ResumeAnalysisService from './modules/resume-analysis/resume.service.js';

const testResume = `
John Doe
Email: john.doe@example.com | Phone: (123) 456-7890
LinkedIn: linkedin.com/in/johndoe | GitHub: github.com/johndoe

SUMMARY
Software Developer with 3 years of experience in web development.
Skilled in JavaScript, React, Node.js, and MongoDB.

EXPERIENCE
Frontend Developer at Tech Corp (2022-Present)
- Developed responsive web applications using React and TypeScript
- Improved application performance by 30% through code optimization
- Collaborated with backend team to design REST APIs

EDUCATION
Bachelor of Computer Science, University of Tech (2018-2022)
GPA: 3.8/4.0

SKILLS
Programming: JavaScript, TypeScript, Python, HTML, CSS
Frameworks: React, Node.js, Express.js
Tools: Git, Docker, AWS, VS Code
Databases: MongoDB, PostgreSQL
Soft Skills: Communication, Teamwork, Problem-solving

PROJECTS
E-Commerce Platform
- Built full-stack application with React frontend and Node.js backend
- Implemented user authentication and payment processing
- Used MongoDB for data storage
`;

async function testAnalyzer() {
  console.log('🧪 Testing Resume Analyzer...\n');
  
  try {
    const result = await ResumeAnalysisService.analyzeResume(testResume, 'test-resume.txt');
    
    console.log('✅ Analysis Successful!\n');
    console.log('📊 Resume Score:', result.data.score + '/100');
    console.log('📝 Word Count:', result.data.metadata.wordCount);
    
    console.log('\n🎯 Job Matches:');
    result.data.jobMatches.forEach((match, index) => {
      console.log(`  ${index + 1}. ${match.role} (${match.matchScore}% match)`);
      console.log(`     Matched Skills: ${match.matchedSkills.join(', ')}`);
    });
    
    console.log('\n💡 Suggestions:');
    result.data.suggestions.forEach((suggestion, index) => {
      console.log(`  ${index + 1}. ${suggestion.title}: ${suggestion.description}`);
    });
    
    console.log('\n🌟 Strengths:');
    result.data.aiAnalysis.strengths?.forEach((strength, index) => {
      console.log(`  - ${strength}`);
    });
    
  } catch (error) {
    console.error('❌ Test Failed:', error.message);
  }
}

testAnalyzer();