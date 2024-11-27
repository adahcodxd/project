import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/authcontext";
import { useNavigate } from "react-router-dom";
import "../../cssfiles/authentication/login.css";

const Login = () => {
  const { login } = useContext(AuthContext); // Access login function from AuthContext
  const navigate = useNavigate();

  // State variables
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isReloaded, setIsReloaded] = useState(false); // State to track reload status

  // Validate input fields
  const validateForm = () => {
    if (!username.trim()) {
      setError("Username cannot be empty!");
      return false;
    }
    if (password.length < 3) {
      setError("Password must be at least 3 characters long!");
      return false;
    }
    return true;
  };

  const handleLogin = () => {
    if (!validateForm()) return;

    setError(""); // Clear previous errors
    setIsLoading(true); // Start loading

    setTimeout(() => {
      // Check if page is already reloaded
      if (!isReloaded) {
        if (password === "123") {
          const user = { username, role: "user" };
          localStorage.setItem("user", JSON.stringify(user));
          login(user);
          navigate("/user-dashboard"); // Redirect to user dashboard
          window.location.reload(); // Reload the page
          setIsReloaded(true); // Set reload status to true
        } else if (password === "111") {
          const admin = { username, role: "admin" };
          localStorage.setItem("user", JSON.stringify(admin));
          login(admin);
          navigate("/admin-dashboard"); // Redirect to admin dashboard
          window.location.reload(); // Reload the page
          setIsReloaded(true); // Set reload status to true
        } else {
          setError("Invalid credentials! Please check your username and password.");
        }
      } else {
        // If already reloaded, just handle the routing
        if (password === "123") {
          const user = { username, role: "user" };
          localStorage.setItem("user", JSON.stringify(user));
          login(user);
          navigate("/user-dashboard"); // Redirect to user dashboard
        } else if (password === "111") {
          const admin = { username, role: "admin" };
          localStorage.setItem("user", JSON.stringify(admin));
          login(admin);
          navigate("/admin-dashboard"); // Redirect to admin dashboard
        } else {
          setError("Invalid credentials! Please check your username and password.");
        }
      }
      setIsLoading(false); // Stop loading
    }, 1500);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Info Box */}
        <div className="info-box">
          <p> USerName anything Password for user is <strong>123</strong> and password for admin is <strong>111</strong></p>
        </div>

        {/* Header */}
        <div className="login-header">
          <h2>Welcome Back!</h2>
          <p>Sign in to your account to continue</p>
        </div>

        {/* Login Form */}
        <form onSubmit={(e) => e.preventDefault()} className="login-form">
          {/* Username Field */}
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              aria-label="Username"
              required
            />
          </div>

          {/* Password Field */}
          <div className="form-group password-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              aria-label="Password"
              required
            />
          </div>

          {/* Error Message */}
          {error && <div className="error-message" role="alert">{error}</div>}

          {/* Login Button */}
          <button
            type="button"
            className="login-btn"
            onClick={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="spinner"></span> // Loading Spinner
            ) : (
              "Login"
            )}
          </button>
        </form>

        {/* Signup Redirect */}
        <div className="signup-redirect">
          <p>
            Don’t have an account? <a href="/signup">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
