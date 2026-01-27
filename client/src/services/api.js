// client/src/services/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 30000, // 30 seconds for file uploads
  headers: {
    'Content-Type': 'application/json',
  },
});

// Resume Analysis API
export const resumeAPI = {
  // Analyze text resume with role perspective
  analyzeText: (resumeText, role = 'HR') => 
    API.post('/resume/analyze-text', { resumeText, role }),
  
  // Upload resume file
  uploadFile: (formData, role = 'HR') => {
    formData.append('role', role);
    return API.post('/resume/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  
  // Test endpoint
  test: () => API.get('/resume/test'),
  
  // Health check (for internal use only)
  health: () => API.get('/health'),
};

export default API;