import React, { useContext, useState, useEffect, useRef } from 'react';
import ChatContext from './ChatContext';
import { bestDeals } from '../../mockData';

const QuestionList = () => {
  const { commonQuestions, setCurrentView } = useContext(ChatContext);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const topicButtonsRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTopicButtons = () => {
    topicButtonsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleButtonClick = (question) => {
    if (question.keyword === 'Something else') {
      setCurrentView('customQuestion');
      return;
    }

    setSelectedQuestion(question);
    const userMessage = {
      role: 'user',
      content: `${question.keyword}: ${question.details}`,
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    let botMessage;
    if (question.keyword === 'Order Status') {
      botMessage = {
        role: 'assistant',
        content: (
          <div className="order-status-steps">
            <p>Steps to check your order status:</p>
            <ol>
              <li>Click to login to your account</li>
              <li>You'll be directed to your orders page</li>
              <li>Find your order to check its status</li>
            </ol>
            <a
              href="https://www.groupon.com/orders"
              target="_blank"
              rel="noopener noreferrer"
              className="order-status-button"
            >
              Check Order Status <span className="external-link-icon">↗</span>
            </a>
          </div>
        ),
      };
    } else if (question.keyword === 'Refund') {
      botMessage = {
        role: 'assistant',
        content: (
          <div className="order-status-steps">
            <p>Steps to request a refund:</p>
            <ol>
              <li>Click to login to your account</li>
              <li>You'll be directed to your orders page</li>
              <li>Locate the order and click "Request Refund"</li>
            </ol>
            <a
              href="https://www.groupon.com/orders"
              target="_blank"
              rel="noopener noreferrer"
              className="order-status-button"
            >
              Login to request refund
              <span className="external-link-icon">↗</span>
            </a>
          </div>
        ),
      };
    } else if (question.keyword === 'Best Deal') {
      botMessage = {
        role: 'assistant',
        content: renderBestDeals(),
      };
    } else if (question.keyword === 'Coupon') {
      botMessage = {
        role: 'assistant',
        content: (
          <div className="coupon-steps">
            <p>How to use a coupon:</p>
            <ol>
              <li>Find the coupon in your Groupon account</li>
              <li>Take a screenshot of the QR code</li>
              <li>Show the QR code to the merchant at checkout</li>
            </ol>
            <a
              href="https://www.groupon.com/orders"
              target="_blank"
              rel="noopener noreferrer"
              className="order-status-button"
            >
              Login to check coupon
              <span className="external-link-icon">↗</span>
            </a>
          </div>
        ),
      };
    } else if (question.keyword === 'Change Order') {
      botMessage = {
        role: 'assistant',
        content: (
          <div className="order-status-steps">
            <p>Regarding changing coupon time:</p>
            <p>
              Whether a coupon's usage time can be modified depends on the
              specific merchant's policy.
            </p>
            <a
              href="https://www.groupon.com/orders"
              target="_blank"
              rel="noopener noreferrer"
              className="order-status-button"
            >
              Check your orders <span className="external-link-icon">↗</span>
            </a>
          </div>
        ),
      };
    } else {
      botMessage = {
        role: 'assistant',
        content: `Here's some information about ${question.keyword}: [Placeholder for ${question.keyword} information]`,
      };
    }
    setMessages((prevMessages) => [...prevMessages, botMessage]);
  };

  const renderBestDeals = () => (
    <div className="best-deals-steps">
      <p>Here are our top 5 best deals:</p>
      {bestDeals.map((deal, index) => (
        <div key={index} className="deal-item">
          <p>
            {deal.title} - ${deal.price} (Save ${deal.savings})
          </p>
          <small>{deal.description}</small>
          <a
            href={`https://www.groupon.com/deals/${deal.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="deal-button"
          >
            View Deal <span className="external-link-icon">↗</span>
          </a>
        </div>
      ))}
    </div>
  );

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleMainMenu = () => {
    setSelectedQuestion(null);
    setCurrentView('questions');
    setTimeout(scrollToTopicButtons, 0);
  };

  return (
    <div className="question-list-container">
      <div className="chat-time">{getCurrentTime()}</div>
      <div className="message-container system-message">
        <div className="bot-avatar">
          <img src="/groupon-avatar.svg" alt="Groupon" width="30" height="30" />
        </div>
        <div className="message-content welcome-message">
          <p>
            Welcome to Groupon. How may we assist you? You can start by choosing
            a topic:
          </p>
        </div>
      </div>

      {messages.map((message, index) => (
        <div
          key={index}
          className={`message-container ${message.role}-message`}
        >
          {message.role === 'assistant' && (
            <div className="bot-avatar">
              <img
                src="/groupon-avatar.svg"
                alt="Groupon"
                width="30"
                height="30"
              />
            </div>
          )}
          <div className="message-content">
            {typeof message.content === 'string' ? (
              <p>{message.content}</p>
            ) : (
              message.content
            )}
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />

      <div className="topic-buttons" ref={topicButtonsRef}>
        {!selectedQuestion ? (
          <>
            {commonQuestions.map((question, index) => (
              <button
                key={index}
                className="topic-button"
                onClick={() => handleButtonClick(question)}
              >
                {question.keyword}
              </button>
            ))}
          </>
        ) : (
          <button
            className="topic-button main-menu-button"
            onClick={handleMainMenu}
          >
            Main Menu
          </button>
        )}
      </div>
    </div>
  );
};

export default QuestionList;
