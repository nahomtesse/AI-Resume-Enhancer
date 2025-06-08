import './App.css';
import React, {useState} from 'react';

function App() {
  const [resume, setResume] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [suggestions, setSuggestions] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!resume || !jobDesc) return alert("Please fill in both fields.");

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/enhance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resume, job: jobDesc }),
      });

      const data = await res.json();
      console.log("API Response:", data);
      setSuggestions(data.suggestions || "No suggestions returned.");
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Check the server.");
    }

    setLoading(false);
  };


   return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center">Resume Enhancer</h1>

      <textarea
        className="w-full border border-gray-300 rounded-md p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        rows="6"
        placeholder="Paste your resume here"
        value={resume}
        onChange={(e) => setResume(e.target.value)}
      />
      <textarea
        className="w-full border border-gray-300 rounded-md p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        rows="6"
        placeholder="Paste the job description here"
        value={jobDesc}
        onChange={(e) => setJobDesc(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Enhancing..." : "Get Suggestions"}
      </button>

      <div className="mt-6 p-4 bg-gray-100 rounded-md min-h-[150px] whitespace-pre-wrap">
        {suggestions || "No suggestions yet. Paste your resume and job description above."}
      </div>

      <footer className="mt-8 text-center text-gray-500 text-sm">
        Powered by OpenAI
      </footer>
    </div>
  );
}

export default App;
