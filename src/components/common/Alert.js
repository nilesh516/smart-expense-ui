import React from 'react';
import PropTypes from 'prop-types';
import { MdCheckCircle, MdError, MdClose } from 'react-icons/md';

const ALERT_ICONS = {
  success: MdCheckCircle,
  error: MdError,
  warning: MdError
};

function Alert({ type, message, onClose }) {
  if (!message) return null;

  const Icon = ALERT_ICONS[type] || MdCheckCircle;

  return (
    <div className={`alert alert-${type}`} role="alert">
      <span className="alert-content">
        <Icon size={16} style={{ marginRight: 6, verticalAlign: 'middle' }} />
        {message}
      </span>
      {onClose && (
        <button
          className="alert-close"
          onClick={onClose}
          aria-label="Close alert"
        >
          <MdClose size={16} />
        </button>
      )}
    </div>
  );
}

Alert.propTypes = {
  type: PropTypes.oneOf(['success', 'error', 'warning']),
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func
};

Alert.defaultProps = {
  type: 'success',
  onClose: null
};

export default Alert;