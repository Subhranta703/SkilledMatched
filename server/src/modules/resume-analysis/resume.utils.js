// Extract structured sections from resume text
export const extractResumeSections = (text) => {
  const sections = {
    contact: {},
    summary: '',
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: []
  };
  
  const lines = text.split('\n');
  let currentSection = '';
  
  lines.forEach((line, index) => {
    const trimmedLine = line.trim();
    
    // Detect section headers
    if (isSectionHeader(trimmedLine)) {
      currentSection = getSectionName(trimmedLine);
    } else if (trimmedLine) {
      // Add content to current section
      addToSection(sections, currentSection, trimmedLine);
    }
    
    // Extract contact info
    extractContactInfo(sections, trimmedLine);
  });
  
  // Clean and categorize skills
  if (sections.skills.length > 0) {
    sections.skills = categorizeSkills(sections.skills);
  }
  
  return sections;
};

// Calculate resume score (0-100)
export const calculateResumeScore = (sections) => {
  let score = 50; // Base score
  
  // Contact info (10 points)
  if (sections.contact.email) score += 10;
  if (sections.contact.phone) score += 5;
  
  // Experience (20 points)
  if (sections.experience && sections.experience.length > 0) {
    score += Math.min(sections.experience.length * 5, 20);
  }
  
  // Skills (15 points)
  if (sections.skills && sections.skills.technical) {
    score += Math.min(sections.skills.technical.length * 2, 15);
  }
  
  // Education (10 points)
  if (sections.education && sections.education.length > 0) {
    score += 10;
  }
  
  // Projects/Certifications (5 points)
  if ((sections.projects && sections.projects.length > 0) || 
      (sections.certifications && sections.certifications.length > 0)) {
    score += 5;
  }
  
  return Math.min(Math.round(score), 100);
};

// Helper functions
const isSectionHeader = (line) => {
  const headers = ['experience', 'work', 'employment', 'education', 'skills', 
                   'projects', 'certifications', 'summary', 'objective', 'contact'];
  return headers.some(header => 
    line.toLowerCase().replace(/[^a-z]/g, '') === header
  );
};

const getSectionName = (line) => {
  const lineLower = line.toLowerCase();
  if (lineLower.includes('experience') || lineLower.includes('work')) return 'experience';
  if (lineLower.includes('education')) return 'education';
  if (lineLower.includes('skill')) return 'skills';
  if (lineLower.includes('project')) return 'projects';
  if (lineLower.includes('certif')) return 'certifications';
  if (lineLower.includes('summary') || lineLower.includes('objective')) return 'summary';
  return '';
};

const addToSection = (sections, sectionName, content) => {
  if (sectionName && sections[sectionName]) {
    if (Array.isArray(sections[sectionName])) {
      sections[sectionName].push(content);
    } else {
      sections[sectionName] += ' ' + content;
    }
  }
};

const extractContactInfo = (sections, line) => {
  // Email
  const emailMatch = line.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/);
  if (emailMatch) {
    sections.contact.email = emailMatch[0];
  }
  
  // Phone
  const phoneMatch = line.match(/(\+\d{1,3}[-.]?)?\(?\d{3}\)?[-.]?\d{3}[-.]?\d{4}/);
  if (phoneMatch) {
    sections.contact.phone = phoneMatch[0];
  }
  
  // LinkedIn
  if (line.includes('linkedin.com')) {
    sections.contact.linkedin = line;
  }
  
  // GitHub
  if (line.includes('github.com')) {
    sections.contact.github = line;
  }
};

const categorizeSkills = (skillsArray) => {
  const categories = {
    technical: [],
    tools: [],
    soft: [],
    languages: []
  };
  
  const techKeywords = ['javascript', 'python', 'java', 'react', 'node', 'sql', 'html', 'css'];
  const toolKeywords = ['git', 'docker', 'aws', 'figma', 'jira', 'jenkins'];
  const softKeywords = ['communication', 'leadership', 'teamwork', 'problem', 'analytical'];
  
  skillsArray.forEach(skill => {
    const skillLower = skill.toLowerCase();
    
    if (techKeywords.some(keyword => skillLower.includes(keyword))) {
      categories.technical.push(skill);
    } else if (toolKeywords.some(keyword => skillLower.includes(keyword))) {
      categories.tools.push(skill);
    } else if (softKeywords.some(keyword => skillLower.includes(keyword))) {
      categories.soft.push(skill);
    } else if (skillLower.includes('english') || skillLower.includes('spanish') || 
               skillLower.includes('language')) {
      categories.languages.push(skill);
    } else {
      categories.technical.push(skill); // Default to technical
    }
  });
  
  return categories;
};