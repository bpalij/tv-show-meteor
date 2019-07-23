import React from 'react';
import PropTypes from 'prop-types';

function ErrorMessage(props) {
  const { err } = props;
  return (<div className="error-message">{err}</div>);
}

ErrorMessage.propTypes = {
  err: PropTypes.string.isRequired,
};

export default ErrorMessage;
