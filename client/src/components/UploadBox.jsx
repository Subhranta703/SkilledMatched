import React, { useState } from 'react';
import axios from 'axios';

const UploadBox = () => {
  const [resumeText, setResumeText] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
   const response = await axios.post('/api/resume/analyze', { resumeText });
      setResult(response.data);
    } catch (error) {
      console.error('API call failed:', error);
      setResult('Error analyzing resume');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">SkillMatched - Resume Analyzer</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <textarea
          className="w-full p-3 border rounded"
          rows="10"
          placeholder="Paste your resume text here..."
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
        ></textarea>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? 'Analyzing...' : 'Analyze Resume'}
        </button>
      </form>
      {result && (
        <div className="mt-6 p-4 bg-gray-100 border rounded">
          <h3 className="font-semibold mb-2">AI Response:</h3>
          <pre className="whitespace-pre-wrap text-sm">{result}</pre>
        </div>
      )}
    </div>
  );
};

export default UploadBox;