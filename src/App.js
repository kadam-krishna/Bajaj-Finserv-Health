import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async () => {
    try {
      const data = JSON.parse(jsonInput);
      setErrorMessage('');

      const apiResponse = await axios.post('/bfhl', { data });
      setResponse(apiResponse.data);
    } catch (error) {
      if (error instanceof SyntaxError) {
        setErrorMessage('Invalid JSON format. Please correct it.');
      } else {
        setErrorMessage('Error: ' + error.message);
      }
      setResponse(null);
    }
  };

  const handleOptionChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedOptions([...selectedOptions, value]);
    } else {
      setSelectedOptions(selectedOptions.filter((option) => option !== value));
    }
  };

  const filteredResponse = response
    ? {
        ...response,
        numbers: selectedOptions.includes('numbers') ? response.numbers : [],
        alphabets: selectedOptions.includes('alphabets') ? response.alphabets : [],
        highest_lowercase_alphabet: selectedOptions.includes('highest_lowercase_alphabet')
          ? response.highest_lowercase_alphabet
          : [],
      }
    : null;

  return (
    <div>
      <h1>ABCD123</h1>
      <textarea
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder="Enter JSON data"
      />
      <button onClick={handleSubmit}>Submit</button>
      {errorMessage && <div className="error">{errorMessage}</div>}

      {response && (
        <div className="response">
          <h2>Response</h2>
          <div>User ID: {response.user_id}</div>
          <div>Email: {response.email}</div>
          <div>Roll Number: {response.roll_number}</div>

          <h3>Select Options</h3>
          <label>
            <input
              type="checkbox"
              value="numbers"
              checked={selectedOptions.includes('numbers')}
              onChange={handleOptionChange}
            />
            Numbers
          </label>
          <label>
            <input
              type="checkbox"
              value="alphabets"
              checked={selectedOptions.includes('alphabets')}
              onChange={handleOptionChange}
            />
            Alphabets
          </label>
          <label>
            <input
              type="checkbox"
              value="highest_lowercase_alphabet"
              checked={selectedOptions.includes('highest_lowercase_alphabet')}
              onChange={handleOptionChange}
            />
            Highest Lowercase Alphabet
          </label>

          <pre>{JSON.stringify(filteredResponse, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default App;
