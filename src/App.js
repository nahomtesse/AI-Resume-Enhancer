import './App.css';

function App() {
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
        ></textarea>
        <textarea
          className="w-full border p-2 rounded"
          rows="6"
          placeholder="Paste the job description here"
        ></textarea>
        <button className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded">
          Get Suggestions
        </button>
        <div className="App-suggestions">
          {/* Suggestions will be displayed here */}
          <p>No suggestions yet. Paste your resume and job description above.</p>
        </div>
        <div className="App-footer">
          <p>Powered by AI</p>
        </div>
      </main>


    </div>
  );
}

export default App;
