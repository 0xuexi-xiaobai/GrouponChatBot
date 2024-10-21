import React, { useContext } from 'react';
import ChatContext from './ChatContext';

const QuestionDetail = () => {
  const { selectedQuestion, handleSend } = useContext(ChatContext);

  return (
    <div className="question-detail-container">
      <h4>{selectedQuestion.keyword}</h4>
      <p>{selectedQuestion.details}</p>
      <button onClick={() => handleSend(selectedQuestion.details)}>
        Ask this question
      </button>
    </div>
  );
};

export default QuestionDetail;
