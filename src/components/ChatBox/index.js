import React, { useState, useEffect } from 'react';
import ChatContext from './ChatContext';
import QuestionList from './QuestionList';
import ChatInterface from './ChatInterface';
import QuestionDetail from './QuestionDetail';
import CustomQuestion from './CustomQuestion';
import { initializeOpenAI, sendMessage } from '../../services/openaiService';

function ChatBox({ onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentView, setCurrentView] = useState('questions');
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const commonQuestions = [
    { keyword: 'Order Status', details: 'Where is my order?' },
    { keyword: 'Best Deal', details: "What's the best deal today?" },
    { keyword: 'Refund', details: 'How can I get a refund?' },
    { keyword: 'Coupon', details: 'How do I use a coupon?' },
    { keyword: 'Change Order', details: 'Can I change my coupon time?' },
    { keyword: 'Something else', details: 'I have a different question' },
  ];

  useEffect(() => {
    const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
    initializeOpenAI(apiKey);
  }, []);

  const handleSend = async (messageText = input) => {
    if (messageText.trim() === '' || isLoading) return;

    setIsLoading(true);
    setCurrentView('chat');
    const newMessages = [...messages, { role: 'user', content: messageText }];
    setMessages(newMessages);
    setInput('');

    try {
      const assistantMessage = await sendMessage(newMessages);
      setMessages((prevMessages) => [...prevMessages, assistantMessage]);
    } catch (error) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: 'assistant',
          content:
            "I apologize, but I'm having trouble processing your request at the moment. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuestionClick = (question) => {
    if (question.keyword === 'Order Status') {
      setCurrentView('questionDetail');
      setSelectedQuestion(question);
    } else if (question.keyword === 'Something else') {
      setCurrentView('customQuestion');
      setInput('');
    } else {
      setMessages([
        ...messages,
        { role: 'user', content: `${question.keyword}: ${question.details}` },
      ]);
      handleSend(question.details);
    }
  };

  const viewComponents = {
    questions: QuestionList,
    chat: ChatInterface,
    questionDetail: QuestionDetail,
    customQuestion: CustomQuestion,
  };

  const CurrentViewComponent = viewComponents[currentView] || QuestionList;

  const handleBack = () => {
    setCurrentView('questions');
    setSelectedQuestion(null);
  };

  const renderHeader = () => {
    if (currentView !== 'questions') {
      return (
        <div className="chat-header">
          <button
            className="back-button"
            onClick={handleBack}
            aria-label="Go back"
          >
            &lt;
          </button>
          <h3>{currentView === 'chat' ? 'Chat With Us' : ''}</h3>
          <button
            className="close-button"
            onClick={onClose}
            aria-label="Close chat"
          >
            &#x2715;
          </button>
        </div>
      );
    }
    return (
      <div className="chat-header">
        <h3>Chat With Us</h3>
        <button
          className="close-button"
          onClick={onClose}
          aria-label="Close chat"
        >
          &#x2715;
        </button>
      </div>
    );
  };

  const handleCustomQuestionSubmit = (questionText) => {
    handleSend(questionText);
    setCurrentView('chat');
  };

  return (
    <ChatContext.Provider
      value={{
        commonQuestions,
        handleQuestionClick,
        isLoading,
        messages,
        input,
        setInput,
        handleBack,
        selectedQuestion,
        handleSend,
        currentView,
        setCurrentView,
        handleCustomQuestionSubmit,
      }}
    >
      <div className="chat-box">
        {renderHeader()}
        <div className="chat-content">
          <CurrentViewComponent />
        </div>
      </div>
    </ChatContext.Provider>
  );
}

export default ChatBox;
