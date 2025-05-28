import React, { useState } from 'react';
import { Container, Form, Button, ListGroup, Spinner, Alert } from 'react-bootstrap';

const Chat = ({ apiUrl }) => {
  const [question, setQuestion] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = 'http://localhost:3001';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/api/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setChatLog((prev) => [...prev, { question, answer: data.answer }]);
      setQuestion('');
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container style={{ maxWidth: '600px', marginTop: '2rem' }}>
      <h3 className="mb-4">Chat with AI</h3>

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="questionInput">
          <Form.Control
            type="text"
            placeholder="Ask a question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            disabled={loading}
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          className="mt-2"
          disabled={loading || !question.trim()}
        >
          {loading ? (
            <>
              <Spinner
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                className="me-2"
              />
              Sending...
            </>
          ) : (
            'Send'
          )}
        </Button>
      </Form>

      {error && (
        <Alert variant="danger" className="mt-3">
          {error}
        </Alert>
      )}

      <ListGroup className="mt-4">
        {chatLog.map(({ question, answer }, idx) => (
          <ListGroup.Item key={idx}>
            <strong>You:</strong> {question}
            <br />
            <strong>AI:</strong> {answer}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default Chat;

