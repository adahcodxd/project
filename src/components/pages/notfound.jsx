import React from "react";
import { Link } from "react-router-dom";
import "../../cssfiles/pages/notfound.css"; // Assuming this file will have the styles

function NotFound() {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="error-code">404</h1>
        <p className="error-message">Oops! The page you're looking for doesn't exist.</p>
        <Link to="/" className="back-home-button">Go Back to Home</Link>
      </div>
    </div>
  );
}

export default NotFound;
