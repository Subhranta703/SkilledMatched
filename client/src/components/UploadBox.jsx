import React, { useState } from "react";
import axios from "axios";

const UploadBox = ({ selectedRole }) => {
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0] || null;

    setFile(selectedFile);
    setAnalysis(null);
    setError("");

    if (selectedFile && selectedFile.type !== "application/pdf") {
      setError("Only PDF files are supported.");
      setFile(null);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      setError("Please upload a PDF file first.");
      return;
    }

    if (!selectedRole) {
      setError("Please select a review perspective first.");
      return;
    }

    if (file.type !== "application/pdf") {
      setError("Only PDF files are supported.");
      return;
    }

    const formData = new FormData();

    // Must match upload.single("resume") in the backend
    formData.append("resume", file);

    // Must match the backend role values
    formData.append("role", selectedRole);

    try {
      setLoading(true);
      setError("");
      setAnalysis(null);

      const response = await axios.post(
        "http://localhost:5000/api/resume/analyze",
        formData
      );

      console.log("API response:", response.data);

      const receivedAnalysis =
        response.data?.analysis ?? response.data?.message ?? response.data;

      setAnalysis(receivedAnalysis);
    } catch (err) {
      console.error("Error analyzing resume:", err);

      const backendError =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Failed to analyze the resume. Please try again.";

      setError(backendError);
    } finally {
      setLoading(false);
    }
  };

  const renderAnalysis = () => {
    if (typeof analysis === "string") {
      return analysis;
    }

    if (analysis && typeof analysis === "object") {
      return JSON.stringify(analysis, null, 2);
    }

    return "No analysis received.";
  };

  return (
    <div className="mt-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          accept=".pdf,application/pdf"
          onChange={handleFileChange}
          disabled={loading}
          className="cursor-pointer rounded-lg border-2 border-dashed border-gray-400 p-3"
        />

        {file && (
          <p className="text-sm text-gray-600">
            Selected file: <strong>{file.name}</strong>
          </p>
        )}

        {selectedRole && (
          <p className="text-sm text-gray-600">
            Review perspective: <strong>{selectedRole}</strong>
          </p>
        )}

        <button
          type="submit"
          disabled={loading || !file}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white transition duration-200 hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          {loading ? "Analyzing..." : "Analyze Resume"}
        </button>
      </form>

      {error && (
        <p className="mt-4 text-center font-medium text-red-500">
          {error}
        </p>
      )}

      {analysis && typeof analysis === "object" && (
  <div className="mt-8 space-y-6">
    <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white shadow-lg">
      <p className="text-sm opacity-80">Resume Score</p>

      <div className="mt-2 flex items-end gap-2">
        <span className="text-6xl font-bold">
          {analysis.score ?? "—"}
        </span>
        <span className="mb-2 text-xl">/100</span>
      </div>

      <p className="mt-3 text-sm opacity-90">
        {analysis.summary}
      </p>
    </div>

    <div className="grid gap-6 md:grid-cols-2">
      <section className="rounded-2xl border border-green-200 bg-green-50 p-5">
        <h3 className="mb-4 text-xl font-semibold text-green-800">
          Strengths
        </h3>

        <div className="space-y-3">
          {analysis.strengths?.map((item, index) => (
            <div key={index}>
              <h4 className="font-semibold text-green-900">
                {item.title}
              </h4>
              <p className="text-sm text-green-800">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-red-200 bg-red-50 p-5">
        <h3 className="mb-4 text-xl font-semibold text-red-800">
          Areas to Improve
        </h3>

        <div className="space-y-3">
          {analysis.weaknesses?.map((item, index) => (
            <div key={index}>
              <h4 className="font-semibold text-red-900">
                {item.title}
              </h4>
              <p className="text-sm text-red-800">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>

    <section className="rounded-2xl border bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-xl font-semibold">
        Suitable Job Roles
      </h3>

      <div className="space-y-4">
        {analysis.jobMatches?.map((job, index) => (
          <div key={index}>
            <div className="mb-1 flex justify-between gap-4">
              <span className="font-medium">{job.role}</span>
              <span className="font-semibold text-blue-600">
                {job.matchPercentage}%
              </span>
            </div>

            <div className="h-2 rounded-full bg-gray-200">
              <div
                className="h-2 rounded-full bg-blue-600"
                style={{
                  width: `${Math.min(
                    Math.max(job.matchPercentage || 0, 0),
                    100
                  )}%`,
                }}
              />
            </div>

            <p className="mt-2 text-sm text-gray-600">
              {job.reason}
            </p>
          </div>
        ))}
      </div>
    </section>

    <section className="rounded-2xl border bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-xl font-semibold">
        Recommended Improvements
      </h3>

      <div className="space-y-4">
        {analysis.suggestions?.map((item, index) => (
          <div key={index} className="border-l-4 border-blue-600 pl-4">
            <div className="flex flex-wrap items-center gap-2">
              <h4 className="font-semibold">{item.title}</h4>

              <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
                {item.priority}
              </span>
            </div>

            <p className="mt-1 text-sm text-gray-600">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>

    <section className="rounded-2xl border bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-xl font-semibold">
        ATS Feedback
      </h3>

      <p className="mb-3 text-3xl font-bold text-purple-600">
        {analysis.atsFeedback?.score ?? "—"}/100
      </p>

      <h4 className="font-semibold">Issues</h4>
      <ul className="mb-4 list-disc pl-5 text-sm text-gray-600">
        {analysis.atsFeedback?.issues?.map((issue, index) => (
          <li key={index}>{issue}</li>
        ))}
      </ul>

      <h4 className="font-semibold">Recommendations</h4>
      <ul className="list-disc pl-5 text-sm text-gray-600">
        {analysis.atsFeedback?.recommendations?.map(
          (recommendation, index) => (
            <li key={index}>{recommendation}</li>
          )
        )}
      </ul>
    </section>
  </div>
)}
    </div>
  );
};

export default UploadBox;