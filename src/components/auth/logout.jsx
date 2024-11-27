import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutPage = ({ setUser }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear user data from localStorage and reset the state
    localStorage.removeItem('user');  // Remove user data from localStorage
    setUser(null);  // Reset user state to null

    // Redirect to home page or login after logout
    navigate('/');
  }, [setUser, navigate]);

  return (
    <div className="logout-container">
      <h2>Logging out...</h2>
      <p>We are redirecting you to the home page...</p>
    </div>
  );
};

export default LogoutPage;
