import { useState } from "react";
import axios from "axios";

const ResumeBuilder = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    degree: "",
    experience: "",
    previousCompany: "",
    skills: "",
    projects: "",
  });

  const [generatedResume, setGeneratedResume] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleGenerate = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/resume", formData);
      setGeneratedResume(res.data.resume);
    } catch (error) {
      console.error("Error generating resume:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded">
      <h1 className="text-3xl font-bold mb-6">Resume Generator</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          className="border p-3 rounded"
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          className="border p-3 rounded"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          className="border p-3 rounded"
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <input
          className="border p-3 rounded"
          type="text"
          name="college"
          placeholder="College/University"
          value={formData.college}
          onChange={handleChange}
        />
        <input
          className="border p-3 rounded"
          type="text"
          name="degree"
          placeholder="Degree (e.g. B.Tech in CSE)"
          value={formData.degree}
          onChange={handleChange}
        />
        <input
          className="border p-3 rounded"
          type="text"
          name="experience"
          placeholder="Years of Experience"
          value={formData.experience}
          onChange={handleChange}
        />
        <input
          className="border p-3 rounded"
          type="text"
          name="previousCompany"
          placeholder="Previous Company"
          value={formData.previousCompany}
          onChange={handleChange}
        />
        <input
          className="border p-3 rounded"
          type="text"
          name="skills"
          placeholder="Skills (comma separated)"
          value={formData.skills}
          onChange={handleChange}
        />
        <textarea
          className="border p-3 rounded col-span-1 sm:col-span-2"
          name="projects"
          placeholder="Projects (describe briefly)"
          rows="4"
          value={formData.projects}
          onChange={handleChange}
        />
      </div>

      <button
        onClick={handleGenerate}
        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        Generate Resume
      </button>

      {generatedResume && (
        <div className="mt-8 border p-6 rounded bg-gray-100 whitespace-pre-wrap">
          <h2 className="text-xl font-semibold mb-4">Generated Resume:</h2>
          {generatedResume}
        </div>
      )}
    </div>
  );
};

export default ResumeBuilder;
