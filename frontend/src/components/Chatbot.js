// src/components/Chatbot.js
import React from 'react';
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import config from './chatbotConfig';

const CustomerChatbot = () => {
  return (
    <div style={{ maxWidth: '400px', position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
      <Chatbot config={config} />
    </div>
  );
};

export default CustomerChatbot;
