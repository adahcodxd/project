import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../../cssfiles/navbar/home.css";

const HomeNavbar = () => {
  const location = useLocation();

  return (
    <nav className="homenavbar">
      <div className="homenavbar-container">
        {/* Logo */}
        <div className="logo">
          <Link to="/">MyApp</Link>
        </div>

        {/* Navigation Links */}
        <ul className="nav-links">
          <li className={location.pathname === "/" ? "active" : ""}>
            <Link to="/">Home</Link>
          </li>
          <li className={location.pathname === "/about" ? "active" : ""}>
            <Link to="/about">About</Link>
          </li>
          <li className={location.pathname === "/contact" ? "active" : ""}>
            <Link to="/contact">Contact</Link>
          </li>
          <li className={location.pathname === "/services" ? "active" : ""}>
            <Link to="/services">Services</Link>
          </li>
        </ul>

        {/* Right-Side Auth Links */}
        <div className="auth-links">
          <Link
            to="/login"
            className={location.pathname === "/login" ? "active auth-btn" : "auth-btn"}
          >
            Login
          </Link>
          <Link
            to="/signup"
            className={location.pathname === "/signup" ? "active auth-btn" : "auth-btn"}
          >
            Signup
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default HomeNavbar;
