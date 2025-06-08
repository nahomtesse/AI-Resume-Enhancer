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
    <div className="App">
      <header className="text-2xl font-bold mb-4">
        <p>Resume Enhancer</p>
      </header>

      <main className="App-main">
        <textarea
          className="w-full border p-2 rounded"
          rows="6"
          placeholder="Paste your resume here"
          value={resume}
          onChange={(e) => setResume(e.target.value)}
        />
        <textarea
          className="w-full border p-2 rounded"
          rows="6"
          placeholder="Paste the job description here"
          value={jobDesc}
          onChange={(e) => setJobDesc(e.target.value)}
        />
        <button
          onClick={handleSubmit}
          className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded"
          disabled={loading}
        >
          {loading ? "Enhancing..." : "Get Suggestions"}
        </button>

        <div className="App-suggestions mt-4">
          {suggestions ? (
            <pre className="whitespace-pre-wrap">{suggestions}</pre>
          ) : (
            <p>No suggestions yet. Paste your resume and job description above.</p>
          )}
        </div>

        <div className="App-footer mt-6">
          <p>Powered by AI</p>
        </div>
      </main>
    </div>
  );
}

export default App;
