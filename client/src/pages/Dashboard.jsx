import React, { useEffect, useState, useMemo } from 'react';

// --- Mock Data (replace with your actual API call) ---
// I've created more detailed mock data to better showcase the UI enhancements.
const getMockHistory = () => new Promise(resolve => {
  setTimeout(() => {
    resolve([
      {
        _id: '64a5e0d8f1b2c3d4e5f6a7b1',
        createdAt: new Date('2024-07-15T10:30:00Z').toISOString(),
        resumeText: 'John Doe\nSoftware Engineer\n...full resume text here...',
        // The result can be a structured object for better display
        result: JSON.stringify({
          score: 88,
          summary: 'A strong profile for a mid-level software engineer role.',
          strengths: ['Excellent project experience with modern tech stacks.', 'Clear and concise skill section.'],
          improvements: ['Quantify achievements in the experience section with metrics.', 'Add a professional summary.'],
        }),
        title: 'Software Engineer Application'
      },
      {
        _id: '64a5e0d8f1b2c3d4e5f6a7b2',
        createdAt: new Date('2024-07-12T14:00:00Z').toISOString(),
        resumeText: 'Jane Smith\nProduct Manager\n...full resume text here...',
        result: JSON.stringify({
          score: 92,
          summary: 'Outstanding resume for a product leadership position.',
          strengths: ['Strong alignment with product management competencies.', 'Impactful project descriptions.'],
          improvements: ['Consider adding a link to a portfolio or case studies.'],
        }),
        title: 'Senior Product Manager Role'
      },
      // Add more items to test scrolling
      {
        _id: '64a5e0d8f1b2c3d4e5f6a7b3',
        createdAt: new Date('2024-06-28T09:15:00Z').toISOString(),
        resumeText: 'Alex Johnson\nData Scientist\n...full resume text here...',
        result: JSON.stringify({
          score: 85,
          summary: 'Solid resume with great potential.',
          strengths: ['Good variety of data science projects.', 'Relevant technical skills.'],
          improvements: ['Elaborate on the business impact of the projects.'],
        }),
        title: 'Data Scientist Position'
      },
    ]);
  }, 1000); // Simulate network delay
});


// --- Helper Icon Components (using inline SVG) ---
const ClockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>;
const DocumentIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>;
const ChartIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>;
const CheckCircleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-green-500 mr-2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>;
const AlertTriangleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-yellow-500 mr-2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>;


// --- Reusable Components ---

// Card for displaying summary statistics
const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex items-center space-x-4">
    <div className={`rounded-full p-3 ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-500 font-medium">{title}</p>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

// Modal to show detailed analysis results
const AnalysisDetailModal = ({ item, onClose }) => {
  // FIXED: The useMemo hook is now called unconditionally at the top level of the component.
  const result = useMemo(() => {
    // A defensive check inside the memoized function is safe.
    if (!item) return { summary: '', strengths: [], improvements: [] };
    try {
      return JSON.parse(item.result);
    } catch {
      // Fallback for when result is just a string instead of JSON
      return { summary: item.result, strengths: [], improvements: [] };
    }
  }, [item]);

  // The parent component's conditional rendering (`selectedItem && ...`) already prevents
  // this component from rendering with a null `item`. This check is an extra safeguard.
  if (!item) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b sticky top-0 bg-white z-10">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-gray-900">{item.title || 'Analysis Details'}</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-3xl leading-none">&times;</button>
          </div>
          <p className="text-sm text-gray-500 mt-1">Analyzed on: {new Date(item.createdAt).toLocaleString()}</p>
        </div>
        
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* AI Result Section */}
          <div className="space-y-4">
            <h4 className="font-bold text-lg text-gray-800">AI Analysis</h4>
            {result.score && (
              <div className="flex items-center">
                <p className="font-semibold mr-3">Overall Score:</p>
                <div className="text-xl font-bold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">{result.score} / 100</div>
              </div>
            )}
             <p className="bg-gray-100 p-3 rounded-lg text-gray-700">{result.summary}</p>
             <div>
                <h5 className="font-semibold mb-2 text-gray-700">Strengths</h5>
                <ul className="space-y-2">
                    {result.strengths.map((s, i) => <li key={i} className="flex items-start"><CheckCircleIcon /> <span className="flex-1">{s}</span></li>)}
                </ul>
             </div>
             <div>
                <h5 className="font-semibold mb-2 text-gray-700">Areas for Improvement</h5>
                <ul className="space-y-2">
                    {result.improvements.map((imp, i) => <li key={i} className="flex items-start"><AlertTriangleIcon /> <span className="flex-1">{imp}</span></li>)}
                </ul>
             </div>
          </div>

          {/* Original Resume Text */}
          <div className="space-y-4">
            <h4 className="font-bold text-lg text-gray-800">Original Resume</h4>
            <pre className="bg-gray-100 p-4 rounded-lg text-sm text-gray-800 whitespace-pre-wrap font-sans h-96 overflow-y-auto">
              {item.resumeText}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};


// --- Main Dashboard Component ---
export default function Dashboard() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        // In a real app, you would use axios:
        // const res = await axios.get('/api/resume/history');
        // setHistory(res.data);
        const mockData = await getMockHistory();
        setHistory(mockData);
      } catch (err) {
        console.error('Error fetching history:', err);
        setError('Failed to load analysis history.');
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  // Memoized stats to prevent recalculation on every render
  const stats = useMemo(() => {
    if (history.length === 0) {
      return { total: 0, avgScore: 'N/A', latest: 'N/A' };
    }
    const scores = history.map(item => {
        try { return JSON.parse(item.result).score || 0; }
        catch { return 0; }
    }).filter(score => score > 0);

    const avgScore = scores.length > 0 ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(0) : 'N/A';
    const latestDate = new Date(Math.max(...history.map(item => new Date(item.createdAt))));

    return {
      total: history.length,
      avgScore,
      latest: latestDate.toLocaleDateString(),
    };
  }, [history]);

  return (
    <>
      <div className="bg-gray-50 min-h-screen">
        <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600 mb-8">Welcome back! Here's an overview of your resume analyses.</p>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <StatCard title="Total Analyses" value={stats.total} icon={<DocumentIcon />} color="bg-blue-100 text-blue-600" />
            <StatCard title="Average Score" value={stats.avgScore} icon={<ChartIcon />} color="bg-green-100 text-green-600" />
            <StatCard title="Most Recent" value={stats.latest} icon={<ClockIcon />} color="bg-purple-100 text-purple-600" />
          </div>

          {/* History List */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">📜 Analysis History</h2>
            {loading ? (
              <p className="text-center text-gray-500 py-8">Loading history...</p>
            ) : error ? (
              <p className="text-center text-red-500 py-8">{error}</p>
            ) : history.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No resume analyses found.</p>
            ) : (
              <div className="space-y-4">
                {history.map((item) => {
                  // FIXED: Removed useMemo from inside the map callback.
                  // A simple calculation is sufficient and correct here.
                  const score = (() => {
                    try {
                      return JSON.parse(item.result).score || null;
                    } catch {
                      return null;
                    }
                  })();

                  return (
                    <div key={item._id} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200 border">
                      <div className="md:col-span-2">
                        <p className="font-semibold text-gray-800">{item.title || 'Untitled Analysis'}</p>
                        <p className="text-sm text-gray-500">{new Date(item.createdAt).toLocaleString()}</p>
                      </div>
                      <div className="flex items-center">
                        {score ? (
                            <span className={`font-bold text-lg ${score > 85 ? 'text-green-600' : score > 70 ? 'text-yellow-600' : 'text-red-600'}`}>
                                {score} <span className="text-sm font-normal text-gray-500">/ 100</span>
                            </span>
                        ) : <span className="text-gray-400">No score</span>}
                      </div>
                      <div className="flex justify-end">
                        <button
                          onClick={() => setSelectedItem(item)}
                          className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition-all shadow-sm"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Modal for viewing details */}
      {selectedItem && <AnalysisDetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />}
    </>
  );
}
