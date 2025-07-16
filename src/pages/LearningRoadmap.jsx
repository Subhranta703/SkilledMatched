import React, { useState } from 'react';

const roadmapData = [
  // Technical Roles
  { title: 'Frontend Developer', type: 'Technical', topics: ['HTML', 'CSS', 'JavaScript', 'React', 'Redux', 'Testing'] },
  { title: 'Backend Developer', type: 'Technical', topics: ['Node.js', 'Express', 'MongoDB', 'REST APIs', 'Auth'] },
  { title: 'Full Stack Developer', type: 'Technical', topics: ['MERN Stack', 'Deployment', 'CI/CD', 'Microservices'] },
  { title: 'DevOps Engineer', type: 'Technical', topics: ['Linux', 'Docker', 'Kubernetes', 'CI/CD', 'AWS'] },
  { title: 'Data Scientist', type: 'Technical', topics: ['Python', 'Pandas', 'Scikit-Learn', 'ML Models'] },
  { title: 'Data Analyst', type: 'Technical', topics: ['Excel', 'SQL', 'Power BI', 'Statistics'] },
  { title: 'Machine Learning Engineer', type: 'Technical', topics: ['ML Ops', 'TensorFlow', 'Model Deployment'] },
  { title: 'Mobile App Developer', type: 'Technical', topics: ['Flutter', 'React Native', 'Android', 'iOS'] },
  { title: 'Cybersecurity Analyst', type: 'Technical', topics: ['Network Security', 'Ethical Hacking', 'SIEM'] },
  { title: 'Cloud Engineer', type: 'Technical', topics: ['AWS', 'Azure', 'GCP', 'Serverless', 'Terraform'] },
  { title: 'Blockchain Developer', type: 'Technical', topics: ['Solidity', 'Ethereum', 'Smart Contracts'] },
  { title: 'AI/ML Researcher', type: 'Technical', topics: ['Deep Learning', 'NLP', 'LLMs', 'GenAI'] },
  { title: 'Game Developer', type: 'Technical', topics: ['Unity', 'C#', 'Game Physics', '3D Modeling'] },
  { title: 'IoT Engineer', type: 'Technical', topics: ['Arduino', 'Raspberry Pi', 'Sensors', 'MQTT'] },
  { title: 'AR/VR Developer', type: 'Technical', topics: ['Unity', 'Blender', 'ARKit', 'WebXR'] },

  // Non-Technical Roles
  { title: 'UI/UX Designer', type: 'Non-Tech', topics: ['Figma', 'User Research', 'Wireframes', 'Accessibility'] },
  { title: 'Digital Marketing', type: 'Non-Tech', topics: ['SEO', 'Google Ads', 'Social Media', 'Analytics'] },
  { title: 'Business Analyst', type: 'Non-Tech', topics: ['Requirement Gathering', 'Use Cases', 'JIRA', 'UML'] },
  { title: 'Product Manager', type: 'Non-Tech', topics: ['Agile', 'Scrum', 'Roadmaps', 'Market Research'] },
  { title: 'Project Manager', type: 'Non-Tech', topics: ['Scope Planning', 'Gantt Charts', 'Risk Management'] },
  { title: 'Technical Writer', type: 'Non-Tech', topics: ['Documentation', 'Markdown', 'API Guides'] },
  { title: 'HR Recruiter', type: 'Non-Tech', topics: ['ATS Systems', 'Sourcing', 'Interviewing', 'Onboarding'] },
  { title: 'Salesforce Admin', type: 'Non-Tech', topics: ['CRM Basics', 'Workflows', 'Salesforce Lightning'] },
  { title: 'Content Creator', type: 'Non-Tech', topics: ['YouTube', 'Reels', 'Monetization', 'Branding'] },
  { title: 'Customer Success', type: 'Non-Tech', topics: ['CRM Tools', 'Feedback Handling', 'Retention'] },
  { title: 'Operations Manager', type: 'Non-Tech', topics: ['Logistics', 'Supply Chain', 'ERP', 'KPIs'] },
  { title: 'Finance Analyst', type: 'Non-Tech', topics: ['Excel', 'Budgeting', 'Forecasting', 'Auditing'] },
  { title: 'Legal Analyst', type: 'Non-Tech', topics: ['Contracts', 'Compliance', 'Corporate Law'] },
  { title: 'E-learning Designer', type: 'Non-Tech', topics: ['Storyboarding', 'LMS', 'Interactive Modules'] },
  { title: 'Tech Support Specialist', type: 'Non-Tech', topics: ['Troubleshooting', 'Helpdesk', 'Remote Tools'] },
];

const LearningRoadmap = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleCard = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen px-6 py-12 bg-gray-50">
      <h1 className="text-4xl font-bold text-center mb-10 text-blue-700">📚 Explore Learning Roadmaps</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {roadmapData.map((roadmap, index) => (
          <div
            key={index}
            onClick={() => toggleCard(index)}
            className="cursor-pointer bg-white p-6 rounded-xl border border-gray-200 shadow-md hover:shadow-xl transition duration-300"
          >
            <h3 className="text-xl font-semibold text-blue-600">{roadmap.title}</h3>
            <span className="text-sm text-gray-500">{roadmap.type}</span>

            {openIndex === index && (
              <ul className="mt-4 list-disc list-inside text-gray-700 text-sm">
                {roadmap.topics.map((topic, i) => (
                  <li key={i}>{topic}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearningRoadmap;
