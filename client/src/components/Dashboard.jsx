import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get('/api/resume/history');
        setHistory(res.data);
      } catch (err) {
        console.error('Error fetching history:', err);
      }
    };
    fetchHistory();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">📜 Resume Analysis History</h2>
      {history.length === 0 ? (
        <p className="text-gray-600">No submissions yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Resume Snippet</th>
                <th className="p-3 text-left">Result Snippet</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item) => (
                <tr key={item._id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{new Date(item.createdAt).toLocaleString()}</td>
                  <td className="p-3 text-sm">{item.resumeText.slice(0, 80)}...</td>
                  <td className="p-3 text-sm">{item.result.slice(0, 80)}...</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
