import React, { useState } from "react";

function ResumeEnhancer() {
  const [resume, setResume] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [suggestions, setSuggestions] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuggestions(null);

    try {
      const res = await fetch('/api/enhance', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resume, job: jobDesc }),
      });

      if (!res.ok) throw new Error("Server error");

      const data = await res.json();
      setSuggestions(data.suggestions); 
    } catch (err) {
      console.error(err);
      alert("Failed to get suggestions");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">AI-Powered Resume Enhancer</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          className="w-full border p-2 rounded"
          rows="6"
          placeholder="Paste your resume here"
          value={resume}
          onChange={(e) => setResume(e.target.value)}
          required
        />
        <textarea
          className="w-full border p-2 rounded"
          rows="6"
          placeholder="Paste the job description here"
          value={jobDesc}
          onChange={(e) => setJobDesc(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Enhancing..." : "Get Suggestions"}
        </button>
      </form>

      {suggestions && (
        <div className="mt-6 p-4 bg-gray-100 rounded">
          <h2 className="font-semibold mb-2">Suggestions:</h2>
          <pre className="whitespace-pre-wrap">{suggestions}</pre>
        </div>
      )}
    </div>
  );
}

export default ResumeEnhancer;
