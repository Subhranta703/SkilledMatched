import React, { useState, useMemo } from 'react';

// --- Helper Data & Functions ---

// A sample list of skills for the suggestion feature
const SKILL_SUGGESTIONS = [
  'JavaScript', 'React', 'Node.js', 'Python', 'Java', 'C++', 'TypeScript',
  'HTML5', 'CSS3', 'Tailwind CSS', 'SQL', 'NoSQL', 'MongoDB', 'PostgreSQL',
  'Git', 'Docker', 'Kubernetes', 'AWS', 'Google Cloud', 'Azure', 'CI/CD',
  'Agile', 'Scrum', 'JIRA', 'Figma', 'Problem Solving', 'Teamwork'
];

// --- Icon Components (using inline SVG for simplicity) ---
const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
);

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
);

const CopyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
);

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><polyline points="20 6 9 17 4 12"></polyline></svg>
);


// --- Main App Component ---
export default function App() {
  // --- State Management ---
  const [personalInfo, setPersonalInfo] = useState({
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    phone: '123-456-7890',
    links: [
      { name: 'LinkedIn', url: 'https://linkedin.com/in/janedoe' },
      { name: 'GitHub', url: 'https://github.com/janedoe' },
    ],
  });

  const [education, setEducation] = useState([
    { institution: 'State University', degree: 'B.S. in Computer Science', period: '2018 - 2022' },
  ]);

  const [projects, setProjects] = useState([
    { name: 'AI Resume Builder', techStack: 'React, Tailwind CSS, Gemini API', description: 'Developed a web app that takes user input and uses an AI model to generate a professional resume.' },
  ]);

  const [skills, setSkills] = useState(['React', 'JavaScript', 'Node.js']);
  const [skillInput, setSkillInput] = useState('');

  const [generatedResume, setGeneratedResume] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // --- Dynamic Input Handlers ---

  // Generic handler for nested state (personalInfo)
  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo(prev => ({ ...prev, [name]: value }));
  };
  
  // Generic handler for arrays of objects (links, education, projects)
  const handleArrayChange = (index, e, section) => {
    const { name, value } = e.target;
    if (section === 'links') {
      const updatedLinks = [...personalInfo.links];
      updatedLinks[index][name] = value;
      setPersonalInfo(prev => ({ ...prev, links: updatedLinks }));
    } else if (section === 'education') {
      const updatedEducation = [...education];
      updatedEducation[index][name] = value;
      setEducation(updatedEducation);
    } else if (section === 'projects') {
      const updatedProjects = [...projects];
      updatedProjects[index][name] = value;
      setProjects(updatedProjects);
    }
  };

  // Functions to add new items to arrays
  const addLink = () => setPersonalInfo(prev => ({ ...prev, links: [...prev.links, { name: '', url: '' }] }));
  const addEducation = () => setEducation([...education, { institution: '', degree: '', period: '' }]);
  const addProject = () => setProjects([...projects, { name: '', techStack: '', description: '' }]);

  // Functions to remove items from arrays
  const removeLink = (index) => setPersonalInfo(prev => ({ ...prev, links: prev.links.filter((_, i) => i !== index) }));
  const removeEducation = (index) => setEducation(education.filter((_, i) => i !== index));
  const removeProject = (index) => setProjects(projects.filter((_, i) => i !== index));

  // --- Skills Input Handlers ---
  const handleSkillInputChange = (e) => {
    setSkillInput(e.target.value);
  };

  const addSkill = (skill) => {
    if (skill && !skills.includes(skill)) {
      setSkills([...skills, skill]);
    }
    setSkillInput('');
  };

  const handleSkillKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addSkill(skillInput.trim());
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };
  
  // Memoized skill suggestions to prevent re-calculation on every render
  const filteredSuggestions = useMemo(() => {
    if (!skillInput) return [];
    return SKILL_SUGGESTIONS.filter(
      suggestion =>
        suggestion.toLowerCase().includes(skillInput.toLowerCase()) &&
        !skills.includes(suggestion)
    ).slice(0, 5); // Show top 5 suggestions
  }, [skillInput, skills]);

  // --- Gemini API Call ---
  const handleGenerateResume = async () => {
    setIsLoading(true);
    setGeneratedResume('');

    // Construct a detailed prompt for the Gemini API
    const prompt = `
      You are a world-class professional resume writer and career coach.
      Your task is to generate a professional, concise, and ATS-friendly resume in Markdown format based on the JSON data provided below.
      The resume should be tailored for a tech role (e.g., Software Engineer, Web Developer).
      
      **Key Instructions:**
      1.  **Professional Summary:** Start with a powerful and concise professional summary (2-3 sentences) that highlights the candidate's key qualifications and career goals.
      2.  **Format:** Use clear headings for each section (Summary, Skills, Experience/Projects, Education, Contact). Use bullet points for descriptions.
      3.  **Tone:** Use strong action verbs and professional language.
      4.  **Content:** Intelligently synthesize the provided information. If project descriptions are brief, elaborate slightly to showcase impact and technical skills.
      5.  **Output:** Provide only the resume content in Markdown. Do not include any introductory text like "Here is your resume".

      **Candidate Data:**
      - **Personal Information:** ${JSON.stringify(personalInfo)}
      - **Education:** ${JSON.stringify(education)}
      - **Skills:** ${skills.join(', ')}
      - **Projects:** ${JSON.stringify(projects)}
    `;

    try {
        let chatHistory = [];
        chatHistory.push({ role: "user", parts: [{ text: prompt }] });
        const payload = { contents: chatHistory };
        const apiKey = ""; // Leave empty, will be handled by the environment
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

        // Exponential backoff for retries
        let response;
        let delay = 1000;
        for (let i = 0; i < 5; i++) {
            response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (response.ok) break;
            await new Promise(resolve => setTimeout(resolve, delay));
            delay *= 2;
        }

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const result = await response.json();
        if (result.candidates && result.candidates.length > 0 && result.candidates[0].content.parts.length > 0) {
            const resumeText = result.candidates[0].content.parts[0].text;
            setGeneratedResume(resumeText);
        } else {
            setGeneratedResume("Error: Could not generate the resume. The model returned an empty response.");
        }
    } catch (error) {
        console.error("Error generating resume:", error);
        setGeneratedResume(`An error occurred while generating the resume. Please check the console for details. Details: ${error.message}`);
    } finally {
        setIsLoading(false);
    }
  };

  // --- Copy to Clipboard ---
  const handleCopy = () => {
    if (generatedResume) {
        const textarea = document.createElement('textarea');
        textarea.value = generatedResume;
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
        document.body.removeChild(textarea);
    }
  };

  // --- Render ---
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Hero Section */}
        <div className="text-center py-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
            AI Resume Builder
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            Fill in your details, and let our AI craft a professional resume for you in seconds.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Input Form */}
          <div className="space-y-6">
            {/* Personal Information */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Personal Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="text" name="name" value={personalInfo.name} onChange={handlePersonalInfoChange} placeholder="Full Name" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" />
                <input type="email" name="email" value={personalInfo.email} onChange={handlePersonalInfoChange} placeholder="Email Address" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" />
                <input type="tel" name="phone" value={personalInfo.phone} onChange={handlePersonalInfoChange} placeholder="Phone Number" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" />
              </div>
              <h3 className="text-lg font-semibold mt-6 mb-2">Links (LinkedIn, GitHub, etc.)</h3>
              {personalInfo.links.map((link, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <input type="text" name="name" value={link.name} onChange={(e) => handleArrayChange(index, e, 'links')} placeholder="Link Name" className="w-1/3 p-2 border border-gray-300 rounded-lg" />
                  <input type="url" name="url" value={link.url} onChange={(e) => handleArrayChange(index, e, 'links')} placeholder="URL" className="flex-grow p-2 border border-gray-300 rounded-lg" />
                  <button onClick={() => removeLink(index)} className="p-2 text-red-500 hover:bg-red-100 rounded-full"><TrashIcon /></button>
                </div>
              ))}
              <button onClick={addLink} className="mt-2 flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-800 transition">
                <PlusIcon /> Add Link
              </button>
            </div>

            {/* Education Section */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Education</h2>
                {education.map((edu, index) => (
                    <div key={index} className="space-y-3 p-4 mb-4 border border-gray-200 rounded-lg relative">
                         <button onClick={() => removeEducation(index)} className="absolute top-2 right-2 p-1 text-red-500 hover:bg-red-100 rounded-full"><TrashIcon /></button>
                         <input type="text" name="institution" value={edu.institution} onChange={(e) => handleArrayChange(index, e, 'education')} placeholder="College/University" className="w-full p-3 border border-gray-300 rounded-lg" />
                         <input type="text" name="degree" value={edu.degree} onChange={(e) => handleArrayChange(index, e, 'education')} placeholder="Degree (e.g., B.S. in Computer Science)" className="w-full p-3 border border-gray-300 rounded-lg" />
                         <input type="text" name="period" value={edu.period} onChange={(e) => handleArrayChange(index, e, 'education')} placeholder="Time Period (e.g., 2018 - 2022)" className="w-full p-3 border border-gray-300 rounded-lg" />
                    </div>
                ))}
                <button onClick={addEducation} className="mt-2 flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-800 transition"><PlusIcon /> Add Education</button>
            </div>

            {/* Skills Section */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Skills</h2>
                <div className="flex flex-wrap gap-2 mb-4">
                    {skills.map((skill, index) => (
                        <div key={index} className="flex items-center bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                            {skill}
                            <button onClick={() => removeSkill(skill)} className="ml-2 text-blue-600 hover:text-blue-800">
                                &times;
                            </button>
                        </div>
                    ))}
                </div>
                <div className="relative">
                    <input 
                        type="text" 
                        value={skillInput}
                        onChange={handleSkillInputChange}
                        onKeyDown={handleSkillKeyDown}
                        placeholder="Add a skill and press Enter" 
                        className="w-full p-3 border border-gray-300 rounded-lg" 
                    />
                    {filteredSuggestions.length > 0 && (
                        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 shadow-lg">
                            {filteredSuggestions.map(suggestion => (
                                <li 
                                    key={suggestion} 
                                    onClick={() => addSkill(suggestion)}
                                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                >
                                    {suggestion}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            {/* Projects Section */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Projects</h2>
                {projects.map((proj, index) => (
                     <div key={index} className="space-y-3 p-4 mb-4 border border-gray-200 rounded-lg relative">
                        <button onClick={() => removeProject(index)} className="absolute top-2 right-2 p-1 text-red-500 hover:bg-red-100 rounded-full"><TrashIcon /></button>
                        <input type="text" name="name" value={proj.name} onChange={(e) => handleArrayChange(index, e, 'projects')} placeholder="Project Name" className="w-full p-3 border border-gray-300 rounded-lg" />
                        <input type="text" name="techStack" value={proj.techStack} onChange={(e) => handleArrayChange(index, e, 'projects')} placeholder="Tech Stack (e.g., React, Node.js, MongoDB)" className="w-full p-3 border border-gray-300 rounded-lg" />
                        <textarea name="description" value={proj.description} onChange={(e) => handleArrayChange(index, e, 'projects')} placeholder="Project Description" rows="3" className="w-full p-3 border border-gray-300 rounded-lg"></textarea>
                     </div>
                ))}
                <button onClick={addProject} className="mt-2 flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-800 transition"><PlusIcon /> Add Project</button>
            </div>
          </div>

          {/* Right Column: Generated Resume */}
          <div className="lg:sticky top-8 self-start">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">Generated Resume</h2>
                    {generatedResume && (
                        <button 
                            onClick={handleCopy}
                            className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition ${isCopied ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                        >
                            {isCopied ? <><CheckIcon /> Copied!</> : <><CopyIcon /> Copy</>}
                        </button>
                    )}
                </div>
                
                <div className="w-full h-[600px] lg:h-[calc(100vh-200px)] overflow-y-auto p-4 bg-gray-50 border rounded-lg">
                    {isLoading ? (
                        <div className="flex items-center justify-center h-full">
                            <div className="text-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                                <p className="mt-4 text-gray-600">Generating your resume...</p>
                            </div>
                        </div>
                    ) : generatedResume ? (
                        <pre className="whitespace-pre-wrap font-mono text-sm text-gray-700">
                            {generatedResume}
                        </pre>
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <div className="text-center text-gray-500">
                                <p>Click "Generate Resume" to see the result here.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
          </div>
        </div>
        
        {/* Floating Generate Button */}
        <div className="mt-8 text-center">
            <button
                onClick={handleGenerateResume}
                disabled={isLoading}
                className="w-full sm:w-auto bg-blue-600 text-white font-bold py-4 px-8 rounded-lg shadow-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-300 ease-in-out"
            >
                {isLoading ? 'Generating...' : 'Generate Resume with AI'}
            </button>
        </div>
      </main>
    </div>
  );
}
