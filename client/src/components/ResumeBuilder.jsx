// client/src/components/ResumeBuilder.jsx
import React, { useState } from 'react';
import { resumeAPI } from '../services/api';

const ResumeBuilder = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    summary: '',
    experience: '',
    education: '',
    skills: '',
    projects: ''
  });
  
  const [generatedResume, setGeneratedResume] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGenerateResume = async () => {
    if (!formData.name || !formData.email) {
      alert('Please fill in at least name and email');
      return;
    }

    setLoading(true);
    try {
      const response = await resumeAPI.generateResume(formData);
      setGeneratedResume(response.resume || 'Resume generated successfully!');
    } catch (error) {
      console.error('Resume generation error:', error);
      // Fallback to local generation
      setGeneratedResume(generateLocalResume(formData));
    } finally {
      setLoading(false);
    }
  };

  const generateLocalResume = (data) => {
    return `
${data.name}
${data.email} | ${data.phone}

SUMMARY
${data.summary}

EXPERIENCE
${data.experience}

EDUCATION
${data.education}

SKILLS
${data.skills}

${data.projects ? `PROJECTS\n${data.projects}` : ''}
    `.trim();
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([generatedResume], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'resume.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Build Your Resume</h3>
      
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Full Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="John Doe"
          />
        </div>
        
        <div>
          <label className="block text-gray-700 font-medium mb-2">Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="john@example.com"
          />
        </div>
        
        <div>
          <label className="block text-gray-700 font-medium mb-2">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="(123) 456-7890"
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">Professional Summary</label>
        <textarea
          name="summary"
          value={formData.summary}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 h-32"
          placeholder="Experienced software developer with 3+ years in web development..."
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Work Experience</label>
          <textarea
            name="experience"
            value={formData.experience}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 h-48"
            placeholder="Software Developer at Tech Corp (2022-Present)&#10;- Developed web applications using React&#10;- Improved performance by 30%"
          />
        </div>
        
        <div>
          <label className="block text-gray-700 font-medium mb-2">Education</label>
          <textarea
            name="education"
            value={formData.education}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 h-48"
            placeholder="BSc Computer Science, University (2018-2022)&#10;GPA: 3.8/4.0"
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">Skills</label>
        <textarea
          name="skills"
          value={formData.skills}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 h-32"
          placeholder="JavaScript, React, Node.js, MongoDB, Git, AWS"
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">Projects (Optional)</label>
        <textarea
          name="projects"
          value={formData.projects}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 h-32"
          placeholder="E-commerce Platform&#10;- Built with React and Node.js&#10;- Implemented user authentication"
        />
      </div>

      <div className="flex space-x-4">
        <button
          onClick={handleGenerateResume}
          disabled={loading || !formData.name || !formData.email}
          className={`px-6 py-3 rounded-lg font-semibold text-white ${
            loading || !formData.name || !formData.email
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? 'Generating...' : 'Generate Resume with AI'}
        </button>
        
        <button
          onClick={() => setFormData({
            name: '', email: '', phone: '', summary: '',
            experience: '', education: '', skills: '', projects: ''
          })}
          className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
        >
          Clear Form
        </button>
      </div>

      {generatedResume && (
        <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-lg font-bold text-gray-800">Generated Resume</h4>
            <button
              onClick={handleDownload}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Download Resume
            </button>
          </div>
          <pre className="whitespace-pre-wrap bg-white p-4 rounded border border-gray-300">
            {generatedResume}
          </pre>
        </div>
      )}
    </div>
  );
};

export default ResumeBuilder;