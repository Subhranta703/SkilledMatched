// pages/Dashboard.jsx
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
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">📜 Resume Analysis History</h2>
      {history.length === 0 ? (
        <p className="text-gray-600">No resume analyses found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-300">
            <thead className="bg-gray-200 text-left">
              <tr>
                <th className="p-3 border">Date</th>
                <th className="p-3 border">Resume</th>
                <th className="p-3 border">AI Result</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="p-3 border">{new Date(item.createdAt).toLocaleString()}</td>
                  <td className="p-3 border text-sm">
                    {item.resumeText.slice(0, 100)}...
                  </td>
                  <td className="p-3 border text-sm">
                    {item.result.slice(0, 100)}...
                  </td>
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
