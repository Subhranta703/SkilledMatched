import React, { useState } from "react";
import { BadgeCheck, Code, Briefcase } from "lucide-react";

const roadmapData = {
  Technical: [
    {
      title: "Frontend Developer",
      topics: [
        "HTML & Semantic Markup",
        "CSS (Flex, Grid)",
        "JavaScript ES6+",
        "React & Hooks",
        "Redux Toolkit",
        "Testing (Jest, RTL)",
        "Performance Optimization",
      ],
    },
    {
      title: "Backend Developer",
      topics: [
        "Node.js & Express",
        "MongoDB & Mongoose",
        "REST APIs & Postman",
        "Authentication (JWT, OAuth)",
        "Error Handling",
        "Async/Await & Middleware",
      ],
    },
    {
      title: "DevOps Engineer",
      topics: [
        "Linux Basics",
        "Docker & Containers",
        "Kubernetes",
        "CI/CD (GitHub Actions)",
        "AWS Basics",
        "Monitoring & Logging",
      ],
    },
    {
      title: "Data Scientist",
      topics: [
        "Python for Data",
        "Pandas & NumPy",
        "Scikit-Learn",
        "Model Evaluation",
        "NLP & Deep Learning",
        "ML Pipelines",
      ],
    },
    {
      title: "Cloud Engineer",
      topics: [
        "AWS / GCP / Azure",
        "Terraform",
        "Serverless Architecture",
        "Cloud Security",
        "Kubernetes",
        "Cloud Cost Optimization",
      ],
    },
  ],
  "Non-Tech": [
    {
      title: "UI/UX Designer",
      topics: [
        "Design Thinking",
        "Wireframing (Figma)",
        "Prototyping",
        "Accessibility",
        "User Testing",
        "Design Systems",
      ],
    },
    {
      title: "Product Manager",
      topics: [
        "Agile & Scrum",
        "User Stories",
        "Product Roadmaps",
        "Market Research",
        "Stakeholder Management",
      ],
    },
    {
      title: "Business Analyst",
      topics: [
        "Data Analysis",
        "Requirement Gathering",
        "JIRA & UML",
        "SWOT Analysis",
        "Reporting Tools (Tableau)",
      ],
    },
    {
      title: "Digital Marketer",
      topics: [
        "SEO & SEM",
        "Google Analytics",
        "Email Marketing",
        "Social Media Ads",
        "Campaign Optimization",
      ],
    },
    {
      title: "Content Creator",
      topics: [
        "YouTube SEO",
        "Reels/Shorts Strategy",
        "Monetization",
        "Content Planning",
        "Brand Collaboration",
      ],
    },
  ],
};

const LearningRoadmap = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [activeType, setActiveType] = useState(null);

  const toggleCard = (type, index) => {
    setActiveType(type);
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen px-4 py-12 bg-gray-50">
      <h1 className="text-4xl font-bold text-center mb-4 text-blue-700">
        📚 Explore Learning Roadmaps
      </h1>
      <p className="text-center text-gray-600 mb-12">
        Click on a role to view its learning path. Choose your journey wisely!
      </p>

      {Object.entries(roadmapData).map(([type, roles]) => (
        <div key={type} className="mb-10 max-w-7xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
            {type === "Technical" ? <Code className="w-5 h-5 text-blue-600" /> : <Briefcase className="w-5 h-5 text-green-600" />}
            {type} Roles
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {roles.map((role, index) => (
              <div
                key={index}
                onClick={() => toggleCard(type, index)}
                className="cursor-pointer bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition duration-300"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-blue-700">{role.title}</h3>
                  <BadgeCheck className="w-5 h-5 text-green-500" />
                </div>

                {activeType === type && openIndex === index && (
                  <ul className="mt-4 list-disc list-inside text-gray-700 text-sm space-y-1">
                    {role.topics.map((topic, i) => (
                      <li key={i}>{topic}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default LearningRoadmap;
