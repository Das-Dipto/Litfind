// ErrorPage.js
import React from 'react';
import './customDesign.css'; // Import the CSS for styling

const ErrorPage = () => {
  return (
    <div className="error-container">
      <h1 className="error-title">Oops!</h1>
      <p className="error-message">Something went wrong. Please try again later.</p>
      <a href="/" className="error-link">Go back to Home</a>
    </div>
  );
};

export default ErrorPage;
