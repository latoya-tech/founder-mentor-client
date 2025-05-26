// src/components/ResponseDisplay.js
import React from 'react';
import { Card } from 'react-bootstrap';

function ResponseDisplay({ response }) {
  // Function to convert markdown-like formatting to HTML
  const formatResponse = (text) => {
    // Replace ** with bold tags
    console.log('this is the bug');
    let formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Replace * with italic tags
    formattedText = formattedText.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Replace newlines with br tags
    formattedText = formattedText.replace(/\n/g, '<br>');

    return formattedText;
  };

  return (
    <Card className="response-card mt-4">
      <Card.Body>
        <Card.Title className="response-title">Response</Card.Title>
        <div
          className="response-content"
          dangerouslySetInnerHTML={{ __html: formatResponse(response.answer) }}
        />
      </Card.Body>
    </Card>
  );
}

export default ResponseDisplay;
