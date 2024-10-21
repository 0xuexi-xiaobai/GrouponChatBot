import React, { useState } from 'react';
import ChatButton from './components/ChatButton';
import ChatBox from './components/ChatBox';
import './App.css';

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src="/groupon.svg" alt="Groupon logo" />
        <p>Welcome to Groupon case study!</p>
      </header>
      {!isChatOpen && <ChatButton onClick={toggleChat} />}
      {isChatOpen && <ChatBox onClose={toggleChat} />}
    </div>
  );
}

export default App;
