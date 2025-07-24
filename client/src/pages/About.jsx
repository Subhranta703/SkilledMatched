import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen px-6 py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold mb-4 text-blue-700 text-center">About SkillMatched</h1>

        <p className="text-gray-700 mb-4 leading-relaxed">
          <strong>SkillMatched</strong> is an AI-powered career guidance platform crafted to help individuals make smarter, data-driven decisions about their professional journey.
          Whether you're a student, job seeker, or working professional, SkillMatched empowers you to evaluate your resume, explore tailored job opportunities, and follow curated learning paths aligned with your goals.
        </p>

        <h2 className="text-2xl font-semibold text-blue-600 mt-6 mb-2">🚀 Our Mission</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          To bridge the gap between ambition and achievement by offering smart, personalized career tools that adapt to each user’s unique journey.
        </p>

        <h2 className="text-2xl font-semibold text-blue-600 mt-6 mb-2">📈 Platform Development</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          SkillMatched is currently in its early development phase and rapidly evolving. New features and modules are being continuously tested, refined, and rolled out to ensure a seamless and insightful experience for users across all backgrounds.
        </p>

        <h2 className="text-2xl font-semibold text-blue-600 mt-6 mb-2">🔮 What's Coming Next?</h2>
        <ul className="list-disc list-inside text-gray-700 leading-relaxed">
          <li>🎯 AI-powered career guidance chatbot</li>
          <li>📊 Resume scoring system with actionable insights</li>
          <li>📁 Resume history & progress tracker</li>
          <li>💼 Curated job/internship matching engine</li>
          <li>🧠 Smart quizzes and skill assessment tools</li>
        </ul>

        <p className="mt-10 text-center text-gray-500 text-sm">
          For any queries or suggestions, feel free to reach out at <a href="mailto:skninfoo@gmail.com" className="text-blue-600 underline">skninfoo@gmail.com</a>
        </p>

        <p className="mt-2 text-center text-gray-400 text-xs">
          © {new Date().getFullYear()} SkillMatched · Created and maintained by Subhranta Nayak
        </p>
      </div>
    </div>
  );
};

export default About;
