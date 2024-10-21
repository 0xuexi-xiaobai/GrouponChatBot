import React from 'react';

function ChatButton({ onClick }) {
  return (
    <button className="chat-button" onClick={onClick}>
      <img src="/chat.svg" alt="Chat" className="chat-icon" />
    </button>
  );
}

export default ChatButton;
