import React from "react";
import { Link } from "react-router-dom";
import "../../cssfiles/pages/home.css";

function HomePage() {
  return (
    <div className="home-page">
      {/* Main Header Section */}
      <header className="home-header">
        <div className="logo">
          <h2>RBAC System</h2>
        </div>
        <div className="home-content">
          <h1 className="main-heading">Welcome to Role-Based Access Control System</h1>
          <p className="sub-heading">
            Your gateway to efficient role management and secure access control.
          </p>
          <div className="cta-buttons">
            <Link to="/login" className="cta-btn login-btn1">Login</Link>
            <Link to="/signup" className="cta-btn signup-btn1">Sign Up</Link>
          </div>
        </div>
      </header>

      {/* Description Section */}
      <section className="description">
        <h2>Why Choose Us?</h2>
        <p>
          Our Role-Based Access Control System helps you manage roles and permissions seamlessly,
          providing a robust and secure solution tailored to your needs.
        </p>
      </section>

      {/* Key Features Section */}
      <section className="features">
        <h2>Key Features</h2>
        <div className="features-list">
          <div className="feature-item">
            <h3>Seamless User Management</h3>
            <p>Easily add, update, or remove users while managing their profiles efficiently.</p>
          </div>
          <div className="feature-item">
            <h3>Comprehensive Reports</h3>
            <p>Generate detailed activity reports for compliance and audits.</p>
          </div>
          <div className="feature-item">
            <h3>Role-Based Permissions</h3>
            <p>Assign specific permissions to roles, ensuring authorized access only.</p>
          </div>
          <div className="feature-item">
            <h3>Real-Time Monitoring</h3>
            <p>Track and manage system access dynamically to enhance security.</p>
          </div>
          <div className="feature-item">
            <h3>Role-Based Permissions</h3>
            <p>Assign specific permissions to roles, ensuring authorized access only.</p>
          </div>
          
          <div className="feature-item">
            <h3>Comprehensive Reports</h3>
            <p>Generate detailed activity reports for compliance and audits.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <h2>What Our Users Say</h2>
        <div className="testimonials-list">
          <div className="testimonial-item">
            <p>
              "This system has transformed how we manage access for our employees. Highly
              recommend it!"
            </p>
            <h4>- John Doe, IT Manager</h4>
          </div>
          <div className="testimonial-item">
            <p>
              "Simplifying permissions management was a game-changer for our company."
            </p>
            <h4>- Jane Smith, Operations Head</h4>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter">
        <h2>Stay Updated</h2>
        <p>Subscribe to our newsletter for the latest updates and insights.</p>
        <form className="newsletter-form">
          <input
            type="email"
            placeholder="Enter your email address"
            className="newsletter-input"
          />
          <button type="submit" className="newsletter-btn">Subscribe</button>
        </form>
      </section>

      {/* Footer Section */}
      <footer className="home-footer">
        <div className="footer-content">
          <div className="footer-about">
            <h3>About RBAC System</h3>
            <p>
              Our mission is to provide organizations with a secure and scalable access control
              system to meet their unique needs.
            </p>
          </div>
          <div className="footer-links">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Sign Up</Link></li>
              <li><Link to="/features">Features</Link></li>
            </ul>
          </div>
          <div className="footer-contact">
            <h3>Contact Us</h3>
            <p>Email: support@rbacsystem.com</p>
            <p>Phone: +123 456 7890</p>
          </div>
        </div>
        <p>&copy; 2024 Role-Based Access Control System. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default HomePage;
