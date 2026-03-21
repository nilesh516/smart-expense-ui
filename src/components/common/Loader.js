import React from 'react';
import PropTypes from 'prop-types';
import { LOADING_MESSAGES } from '../../constants/uiText';

function Loader({ message }) {
  return (
    <div className="loading">
      <div className="spinner" role="status" aria-label="Loading" />
      <p>{message}</p>
    </div>
  );
}

Loader.propTypes = {
  message: PropTypes.string
};

Loader.defaultProps = {
  message: LOADING_MESSAGES.DEFAULT
};

export default Loader;