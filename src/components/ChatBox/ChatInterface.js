import React, { useContext, useRef, useEffect } from 'react';
import ChatContext from './ChatContext';

const ChatInterface = () => {
  const { messages, input, setInput, handleSend, isLoading } =
    useContext(ChatContext);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-interface">
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.role}`}>
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
            <div className="message-content">{message.content}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="chat-input-container">
        <textarea
          className="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          disabled={isLoading}
          rows="1"
        />
        <button
          className="send-button"
          onClick={() => handleSend()}
          disabled={isLoading || !input.trim()}
        >
          {isLoading ? '...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;
