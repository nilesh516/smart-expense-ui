import React from 'react';
import PropTypes from 'prop-types';
import { MdConstruction } from 'react-icons/md';

function ComingSoon({ title, description, phase }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <div className="coming-soon-container">
        <MdConstruction size={60} className="coming-soon-icon" />
        <h3>Coming in {phase}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

ComingSoon.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  phase: PropTypes.string.isRequired
};

export default ComingSoon;