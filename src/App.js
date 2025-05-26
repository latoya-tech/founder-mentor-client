// src/App.js
import React, { useState } from 'react'; // Make sure useEffect is imported
import { Container } from 'react-bootstrap';
import QuestionForm from './components/QuestionForm';
import ResponseDisplay from './components/ResponseDisplay';
import SampleQuestions from './components/SampleQuestions';
import './App.css';

function App() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleQuestionChange = (newQuestion) => {
    setQuestion(newQuestion);
  };

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

   const handleQuestionSubmit = async (e) => {
    // Make sure e exists before trying to use it
    if (e) {
      e.preventDefault();
    }

    // Validate input
    if (!question.trim()) {
      setError('Please enter a question');
      return;
    }

    // Set loading state
    setLoading(true);
    setError(null);

    try {
      console.log('Sending request to:', `${API_URL}/api/ask`);
      console.log('Question:', question);

      const response = await fetch(`${API_URL}/api/ask`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      });

      console.log('Response status:', response.status);

      // Check if the response is ok
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.error || `Server responded with status: ${response.status}`
        );
      }

      // Parse the JSON response
      const data = await response.json();
      console.log('Response data:', data);

      // Update the UI with the answer
      setResponse(data.answer);

    } catch (error) {
      console.error('Error submitting question:', error);
      setError(error.message || 'An unexpected error occurred');
    } finally {
      // Always set loading to false when done
      setLoading(false);
    }
  };

  const handleSampleQuestionClick = (sampleQuestion) => {
    setQuestion(sampleQuestion);
  };

  return (
    <div className="py-5">
    <Container className="app-container">
    <div className="app-header">
    <h1 className="app-title">Founder Mentor</h1>
    <p className="app-subtitle">
    Ask questions and get advice from experienced founders
    </p>
    </div>

    <QuestionForm
    question={question}
    onQuestionChange={handleQuestionChange}
    onSubmit={handleQuestionSubmit}
    loading={loading}
    />

    {error && (
      <div className="alert alert-danger mt-3">{error}</div>
    )}

    {response && (
      <ResponseDisplay response={response} />
    )}

    <SampleQuestions onSampleQuestionClick={handleSampleQuestionClick} />
    </Container>
    </div>
  );
}

export default App;
