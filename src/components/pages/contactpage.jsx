import React from "react";
import "../../cssfiles/pages/contact.css";

function ContactPage() {
  return (
    <div className="contact-page">
      <header className="contact-header">
        <h1>Contact Us</h1>
        <p>
          We’re here to help! Get in touch with us for support, feedback, or
          inquiries.
        </p>
      </header>

      <div className="contact-info">
  <div className="contact-card">
    <i className="fas fa-phone-alt"></i>
    <h3>Phone</h3>
    <p>+123 456 7890</p>
  </div>

  <div className="contact-card">
    <i className="fas fa-envelope"></i>
    <h3>Email</h3>
    <p>support@rbacsystem.com</p>
  </div>

  <div className="contact-card">
    <i className="fas fa-map-marker-alt"></i>
    <h3>Address</h3>
    <p>123 Main Street, City, Country</p>
  </div>
</div>


      <section className="contact-form-section">
        <h2>Send Us a Message</h2>
        <form className="contact-form">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" rows="5" required></textarea>
          <button type="submit" className="contact-btn">Send</button>
        </form>
      </section>
    </div>
  );
}

export default ContactPage;
