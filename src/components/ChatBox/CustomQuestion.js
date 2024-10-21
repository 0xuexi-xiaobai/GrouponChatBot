import React, { useContext, useState } from 'react';
import ChatContext from './ChatContext';

const CustomQuestion = () => {
  const { handleCustomQuestionSubmit } = useContext(ChatContext);
  const [input, setInput] = useState('');

  const handleSubmit = () => {
    if (input.trim()) {
      handleCustomQuestionSubmit(input);
      setInput('');
    }
  };

  return (
    <div className="custom-question-container">
      <h4>How can we help you?</h4>
      <textarea
        className="custom-question-textarea"
        placeholder="Describe your issue or question here..."
        rows="4"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <div className="suggestions">
        <p>Suggestions</p>
        <ul>
          <li>Make sure your question is clear and concise</li>
          <li>Make sure it relates to GROUPON services</li>
          <li>Try to use more general words</li>
        </ul>
      </div>
      <button className="custom-question-submit" onClick={handleSubmit}>
        Send
      </button>
    </div>
  );
};

export default CustomQuestion;
