import React, { useState } from 'react';
import { MdSmartToy, MdClose, MdSend } from 'react-icons/md';
import AIMessage from './AIMessage';
import { MESSAGES, PLACEHOLDERS } from '../../constants/uiText';

const INITIAL_MESSAGE = {
  role: 'assistant',
  content: MESSAGES.AI_WELCOME
};

function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleToggle = () => setIsOpen(prev => !prev);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    // Placeholder until Phase 4 — Claude chat integration
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: MESSAGES.AI_COMING_SOON
      }]);
      setLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <button
        className="ai-fab"
        onClick={handleToggle}
        aria-label={isOpen ? 'Close AI Assistant' : 'Open AI Assistant'}
      >
        {isOpen
          ? <MdClose size={26} />
          : <MdSmartToy size={26} />
        }
      </button>

      {isOpen && (
        <div className="ai-panel" role="dialog" aria-label="AI Assistant">
          <div className="ai-panel-header">
            <span>AI Assistant</span>
            <span className="ai-panel-subtitle">Powered by Claude</span>
          </div>

          <div className="ai-messages">
            {messages.map((msg, index) => (
              <AIMessage key={index} message={msg} />
            ))}
            {loading && (
              <div className="ai-message assistant">
                <div className="typing-indicator" aria-label="AI is typing">
                  <span /><span /><span />
                </div>
              </div>
            )}
          </div>

          <div className="ai-input">
            <input
              type="text"
              placeholder={PLACEHOLDERS.AI_INPUT}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              aria-label="Message input"
              disabled={loading}
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              aria-label="Send message"
            >
              <MdSend size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default AIAssistant;