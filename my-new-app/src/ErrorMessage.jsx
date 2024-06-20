import React from 'react';

const ErrorMessage = ({ error }) => error && <div style={{ color: 'red' }}>{error}</div>;

export default ErrorMessage;
