// src/components/chatbotConfig.js
import { createChatBotMessage } from 'react-chatbot-kit';

const config = {
  initialMessages: [
    createChatBotMessage("Xin chào! Tôi có thể giúp gì cho bạn hôm nay?")
  ],
  botName: "CustomerSupportBot",
  customStyles: {
    botMessageBox: {
      backgroundColor: '#2e7d32',
    },
    chatButton: {
      backgroundColor: '#4caf50',
    },
  },
};

export default config;
