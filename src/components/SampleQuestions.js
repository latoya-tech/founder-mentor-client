// src/components/SampleQuestions.js
import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';

function SampleQuestions({ onSampleQuestionClick }) {
  const sampleQuestions = [
    "How did Helena Rubinstein use innovation in her business?",
    "What was Helena Rubinstein's approach to studying the industry?",
    "How did Helena Rubinstein reinvest her profits?",
    "What was Helena Rubinstein's brand positioning strategy?",
    "How did Helena Rubinstein expand internationally?"
  ];

  return (
    <Card className="sample-questions-card mt-4">
      <Card.Body>
        <Card.Title className="sample-title">Sample Questions</Card.Title>
        <ListGroup variant="flush">
          {sampleQuestions.map((question, index) => (
            <ListGroup.Item
              key={index}
              action
              onClick={() => onSampleQuestionClick(question)}
              className="sample-question-item"
            >
              {question}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
}

export default SampleQuestions;
