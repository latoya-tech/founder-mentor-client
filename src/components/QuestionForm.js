// src/components/QuestionForm.js
import React from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';

function QuestionForm({ question, onQuestionChange, onSubmit, loading }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="question-form-container">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Ask a question about founding or growing a startup..."
            value={question}
            onChange={(e) => onQuestionChange(e.target.value)}
            disabled={loading}
            className="question-input"
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          disabled={loading || !question.trim()}
          className="ask-button"
        >
          {loading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                className="me-2"
              />
              Thinking...
            </>
          ) : (
            'Ask'
          )}
        </Button>
      </Form>
    </div>
  );
}

export default QuestionForm;
