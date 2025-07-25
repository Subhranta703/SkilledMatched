// ResumeForm.jsx
import { useState } from 'react';
import axios from 'axios';

export default function ResumeForm() {
  const [formData, setFormData] = useState({
    name: '', education: '', experience: '', skills: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post('/api/generate-resume', formData);
    const resume = res.data.resume;
    // Save as PDF or display
    console.log(resume);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <input onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Name" />
      <input onChange={e => setFormData({...formData, education: e.target.value})} placeholder="Education" />
      <input onChange={e => setFormData({...formData, experience: e.target.value})} placeholder="Experience" />
      <input onChange={e => setFormData({...formData, skills: e.target.value})} placeholder="Skills" />
      <button type="submit">Generate Resume</button>
    </form>
  );
}
