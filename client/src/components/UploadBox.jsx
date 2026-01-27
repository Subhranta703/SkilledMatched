// client/src/components/UploadBox.jsx
import React, { useState, useRef } from 'react';
import { resumeAPI } from '../services/api';

const UploadBox = ({ selectedRole }) => {
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [mode, setMode] = useState('text'); // 'text' or 'file'
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (selectedFile) => {
    const validTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    
    if (!validTypes.includes(selectedFile.type)) {
      setError('Please upload PDF or Word documents only (PDF, DOC, DOCX)');
      return;
    }
    
    if (selectedFile.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      return;
    }
    
    setFile(selectedFile);
    setError('');
  };

  const handleAnalyze = async () => {
    if (mode === 'text' && !text.trim()) {
      setError('Please enter resume text');
      return;
    }
    
    if (mode === 'file' && !file) {
      setError('Please upload a resume file');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      if (mode === 'text') {
        const response = await resumeAPI.analyzeText(text, selectedRole);
        setResult({
          analysis: response.analysis,
          stats: response.stats
        });
      } else {
        const formData = new FormData();
        formData.append('resume', file);
        const response = await resumeAPI.uploadFile(formData, selectedRole);
        setResult({
          analysis: response.data?.analysis || response.analysis,
          stats: response.data?.stats || response.stats,
          filename: response.filename || file.name
        });
      }
    } catch (err) {
      setError(err.message || 'Failed to analyze resume. Please try again.');
      console.error('Analysis error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setText('');
    setFile(null);
    setResult(null);
    setError('');
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
      {/* Mode Selector */}
      <div className="flex flex-wrap gap-3 mb-6">
        <button
          onClick={() => { setMode('text'); setFile(null); }}
          className={`px-4 py-2.5 rounded-lg font-medium transition-all flex-1 min-w-[120px] ${
            mode === 'text' 
              ? 'bg-blue-600 text-white shadow-md' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <span>📝</span>
            <span>Paste Text</span>
          </div>
        </button>
        <button
          onClick={() => { setMode('file'); setText(''); }}
          className={`px-4 py-2.5 rounded-lg font-medium transition-all flex-1 min-w-[120px] ${
            mode === 'file' 
              ? 'bg-blue-600 text-white shadow-md' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <span>📁</span>
            <span>Upload File</span>
          </div>
        </button>
      </div>

      {/* Text Input Mode */}
      {mode === 'text' && (
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Paste Your Resume Text
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your resume text here...&#10;&#10;Example:&#10;Software Developer with 3 years experience in JavaScript and React.&#10;Built web applications using Node.js and MongoDB."
            className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            disabled={loading}
          />
          <div className="flex flex-wrap justify-between items-center mt-2 gap-2">
            <span className="text-sm text-gray-500">
              Characters: {text.length} | Words: {text.split(/\s+/).filter(w => w).length}
            </span>
            <button
              onClick={() => setText('')}
              className="text-sm text-red-600 hover:text-red-800 px-2 py-1"
            >
              Clear Text
            </button>
          </div>
        </div>
      )}

      {/* File Upload Mode */}
      {mode === 'file' && (
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Upload Resume File
          </label>
          
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive 
                ? 'border-blue-400 bg-blue-50' 
                : 'border-gray-300 hover:border-blue-300'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              id="resume-upload"
              onChange={(e) => handleFileSelect(e.target.files[0])}
              accept=".pdf,.doc,.docx"
              className="hidden"
              disabled={loading}
            />
            
            <div className="text-gray-600">
              <div className="mb-4">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              
              <p className="text-sm mb-2">
                <label htmlFor="resume-upload" className="text-blue-600 hover:text-blue-800 cursor-pointer font-medium">
                  Click to upload
                </label>{' '}
                or drag and drop
              </p>
              
              <p className="text-xs text-gray-500">
                PDF, DOC, DOCX up to 5MB
              </p>
              
              <button
                onClick={() => fileInputRef.current?.click()}
                className="mt-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm transition"
              >
                Browse Files
              </button>
            </div>
            
            {file && (
              <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200 max-w-md mx-auto">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-green-600">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-gray-800 truncate max-w-[200px]">{file.name}</p>
                      <p className="text-xs text-gray-500">{formatFileSize(file.size)} • {file.type.split('/')[1].toUpperCase()}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setFile(null)}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-blue-600 font-bold">PDF</div>
              <div className="text-xs text-gray-600">Resumes</div>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-blue-600 font-bold">DOC</div>
              <div className="text-xs text-gray-600">Word 97-2003</div>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-blue-600 font-bold">DOCX</div>
              <div className="text-xs text-gray-600">Word 2007+</div>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-blue-600 font-bold">5MB</div>
              <div className="text-xs text-gray-600">Max Size</div>
            </div>
          </div>
        </div>
      )}

      {/* Analyze Button */}
      <button
        onClick={handleAnalyze}
        disabled={loading || (mode === 'text' && !text.trim()) || (mode === 'file' && !file)}
        className={`w-full py-3.5 px-4 rounded-lg font-semibold text-white mb-4 transition-all ${
          loading || (mode === 'text' && !text.trim()) || (mode === 'file' && !file)
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg'
        }`}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-3">
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Analyzing from {selectedRole} perspective...
          </span>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <span>🔍</span>
            <span>Analyze Resume ({selectedRole} Perspective)</span>
          </div>
        )}
      </button>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-start">
            <div className="text-red-600 mr-3 flex-shrink-0 mt-0.5">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="mt-8 p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-800">
              Analysis Results ({selectedRole} Perspective)
            </h3>
            {result.filename && (
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                {result.filename}
              </span>
            )}
          </div>
          
          {/* Score Card */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg mb-6 border border-blue-100">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h4 className="font-semibold text-gray-700 mb-1">Resume Score</h4>
                <p className="text-sm text-gray-600">Based on {selectedRole} criteria</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600">{result.analysis.score}</div>
                  <div className="text-sm text-gray-500">out of 100</div>
                </div>
                <div className="w-32 md:w-48">
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-700" 
                      style={{ width: `${result.analysis.score}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          {result.stats && (
            <div className="mb-8 grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-white p-4 rounded-lg border text-center shadow-sm">
                <div className="text-2xl font-bold text-blue-600">{result.stats.wordCount}</div>
                <div className="text-xs text-gray-500 mt-1">Words</div>
              </div>
              <div className="bg-white p-4 rounded-lg border text-center shadow-sm">
                <div className={`text-2xl font-bold ${result.stats.hasEmail ? 'text-green-600' : 'text-red-500'}`}>
                  {result.stats.hasEmail ? '✓' : '✗'}
                </div>
                <div className="text-xs text-gray-500 mt-1">Email</div>
              </div>
              <div className="bg-white p-4 rounded-lg border text-center shadow-sm">
                <div className={`text-2xl font-bold ${result.stats.hasPhone ? 'text-green-600' : 'text-red-500'}`}>
                  {result.stats.hasPhone ? '✓' : '✗'}
                </div>
                <div className="text-xs text-gray-500 mt-1">Phone</div>
              </div>
              <div className="bg-white p-4 rounded-lg border text-center shadow-sm">
                <div className="text-lg font-bold text-purple-600">{selectedRole}</div>
                <div className="text-xs text-gray-500 mt-1">Perspective</div>
              </div>
            </div>
          )}

          {/* Strengths & Weaknesses */}
          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-green-50 to-white p-5 rounded-xl border border-green-100">
              <h4 className="font-semibold text-green-800 mb-4 flex items-center">
                <span className="bg-green-100 p-2 rounded-lg mr-3">
                  <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                Strengths
              </h4>
              <ul className="space-y-3">
                {result.analysis.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-3 flex-shrink-0 mt-1">•</span>
                    <span className="text-gray-700">{strength}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-red-50 to-white p-5 rounded-xl border border-red-100">
              <h4 className="font-semibold text-red-800 mb-4 flex items-center">
                <span className="bg-red-100 p-2 rounded-lg mr-3">
                  <svg className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </span>
                Areas for Improvement
              </h4>
              <ul className="space-y-3">
                {result.analysis.weaknesses.map((weakness, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-red-500 mr-3 flex-shrink-0 mt-1">•</span>
                    <span className="text-gray-700">{weakness}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Job Matches */}
          <div className="mb-8">
            <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
              <span className="bg-blue-100 p-2 rounded-lg mr-3">
                <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </span>
              Job Matches
            </h4>
            <div className="grid md:grid-cols-3 gap-4">
              {result.analysis.jobMatches.map((job, index) => (
                <div key={index} className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all group">
                  <div className="flex justify-between items-center mb-3">
                    <h5 className="font-bold text-gray-800">{job.role}</h5>
                    <span className={`text-sm font-semibold px-2.5 py-1 rounded-full ${
                      job.match >= 80 ? 'bg-green-100 text-green-800' :
                      job.match >= 60 ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {job.match}% match
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{job.reason}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Suggestions */}
          <div className="mb-6">
            <h4 className="font-semibold text-purple-800 mb-4 flex items-center">
              <span className="bg-purple-100 p-2 rounded-lg mr-3">
                <svg className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              Suggestions
            </h4>
            <div className="grid md:grid-cols-3 gap-4">
              {result.analysis.suggestions.map((suggestion, index) => (
                <div key={index} className="bg-white p-4 rounded-lg border border-purple-100 group hover:border-purple-200 transition">
                  <div className="flex items-start gap-3">
                    <div className="bg-purple-100 text-purple-800 font-bold rounded-lg w-8 h-8 flex items-center justify-center flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-gray-700">{suggestion}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-6 border-t border-gray-200">
            <button
              onClick={handleClear}
              className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition flex-1 min-w-[140px]"
            >
              Analyze Another Resume
            </button>
            <button
              onClick={() => window.print()}
              className="px-5 py-2.5 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition flex-1 min-w-[140px]"
            >
              Print Results
            </button>
          </div>
        </div>
      )}

      {/* Instructions */}
      {!result && !loading && (
        <div className="mt-6 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
          <h4 className="font-semibold text-blue-800 mb-3 flex items-center">
            <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            How to use:
          </h4>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="flex items-start gap-2">
              <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm flex-shrink-0">1</div>
              <span className="text-sm text-blue-700">Choose text or file upload</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm flex-shrink-0">2</div>
              <span className="text-sm text-blue-700">Select reviewer perspective</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm flex-shrink-0">3</div>
              <span className="text-sm text-blue-700">Upload or paste resume content</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm flex-shrink-0">4</div>
              <span className="text-sm text-blue-700">Get AI-powered feedback</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadBox;