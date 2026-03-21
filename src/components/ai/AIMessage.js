import React from 'react';
import PropTypes from 'prop-types';
import { MdPerson, MdSmartToy } from 'react-icons/md';

function AIMessage({ message }) {
  const isUser = message.role === 'user';

  return (
    <div className={`ai-message ${isUser ? 'user' : 'assistant'}`}>
      {!isUser && (
        <span className="ai-avatar" aria-label="AI Assistant">
          <MdSmartToy size={20} />
        </span>
      )}
      <div className="ai-bubble">{message.content}</div>
      {isUser && (
        <span className="ai-avatar" aria-label="User">
          <MdPerson size={20} />
        </span>
      )}
    </div>
  );
}

AIMessage.propTypes = {
  message: PropTypes.shape({
    role: PropTypes.oneOf(['user', 'assistant']).isRequired,
    content: PropTypes.string.isRequired
  }).isRequired
};

export default AIMessage;