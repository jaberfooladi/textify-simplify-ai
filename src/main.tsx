import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

const App: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [selectedModel, setSelectedModel] = useState('llama3.2');
  const [simplificationOption, setSimplificationOption] = useState('simple_explain');
  const [simplifiedText, setSimplifiedText] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (loading) {
      // Simulate progress: increase progress until reaching 90%
      timer = setInterval(() => {
        setProgress(prev => (prev < 90 ? prev + 5 : prev));
      }, 500);
    } else {
      setProgress(0);
    }
    return () => clearInterval(timer);
  }, [loading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSimplifiedText('');
    setLoading(true);
    setProgress(0);

    try {
      const response = await fetch('http://localhost:8081', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          text: inputText, 
          model: selectedModel,
          option: simplificationOption 
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(`Error: ${errorData.error || 'Unknown error'}`);
        setLoading(false);
        return;
      }

      const responseText = await response.text();
      console.log('Raw response text:', responseText);

      if (!responseText) {
        setError('Empty response from server');
        setLoading(false);
        return;
      }
      
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (jsonError) {
        setError('Failed to parse JSON response');
        setLoading(false);
        return;
      }
      
      // Complete progress bar and update UI
      setProgress(100);
      setTimeout(() => {
        setSimplifiedText(data.simplified_text || '');
        setLoading(false);
      }, 500); // slight delay to show full progress
    } catch (err: any) {
      setError('Fetch error: ' + err.message);
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Text Simplifier</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <textarea
            rows={6}
            cols={50}
            placeholder="Enter text to simplify..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            style={{ padding: '10px', fontSize: '16px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="modelSelect">Choose a model: </label>
          <select
            id="modelSelect"
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            style={{ padding: '5px', fontSize: '16px' }}
          >
            <option value="llama3.2">llama3.2</option>
            <option value="deepseek-r1">deepseek-r1</option>
          </select>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="optionSelect">Choose simplification style: </label>
          <select
            id="optionSelect"
            value={simplificationOption}
            onChange={(e) => setSimplificationOption(e.target.value)}
            style={{ padding: '5px', fontSize: '16px' }}
          >
            <option value="simple_explain">
              Simple Explanation (for low language proficiency)
            </option>
            <option value="child_friendly">
              Child Friendly (for young audiences)
            </option>
          </select>
        </div>
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
          }}
          disabled={loading}
        >
          Simplify
        </button>
      </form>
      {loading && (
        <div style={{ marginTop: '20px' }}>
          <p>Processing your request...</p>
          <div style={{ width: '100%', background: '#ddd', borderRadius: '5px' }}>
            <div
              style={{
                width: `${progress}%`,
                background: '#4CAF50',
                height: '20px',
                borderRadius: '5px',
                transition: 'width 0.5s ease-out',
              }}
            ></div>
          </div>
        </div>
      )}
      {error && <p style={{ color: 'red', marginTop: '20px' }}>{error}</p>}
      {simplifiedText && (
        <div style={{ marginTop: '20px' }}>
          <h2>Simplified Text</h2>
          <p>{simplifiedText}</p>
        </div>
      )}
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);
