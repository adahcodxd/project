import React from "react";
import "../../cssfiles/pages/about.css";

function AboutPage() {
  return (
    <div className="about-page">
      <header className="about-header">
        <h1>About Us</h1>
        <p>
          Learn more about our mission, vision, and the values that drive our
          Role-Based Access Control System.
        </p>
      </header>

      <section className="about-mission">
        <h2>Our Mission</h2>
        <p>
          To provide organizations with a secure, scalable, and intuitive
          access control system that empowers businesses to thrive in a digital
          era.
        </p>
      </section>

      <section className="about-vision">
        <h2>Our Vision</h2>
        <p>
          A world where secure access management is effortless, empowering
          businesses to focus on what they do best.
        </p>
      </section>

      <section className="about-values">
        <h2>Our Values</h2>
        <ul>
          <li>Security: Keeping your data safe is our top priority.</li>
          <li>Innovation: Continuously improving to meet your needs.</li>
          <li>Integrity: Delivering what we promise with transparency.</li>
        </ul>
      </section>
    </div>
  );
}

export default AboutPage;
