import React from "react";
import "../../cssfiles/pages/service.css";

function ServicesPage() {
  return (
    <div className="services-page">
      <header className="services-header">
        <h1>Our Services</h1>
        <p>
          Explore the wide range of services we offer to simplify access control and management.
        </p>
      </header>

      <section className="services-list">
        <div className="service-item">
          <h2>User Management</h2>
          <p>
            Efficiently manage users with tools to add, update, or remove them securely.
          </p>
        </div>
        <div className="service-item">
          <h2>Role Customization</h2>
          <p>
            Customize roles with specific permissions tailored to your organization's needs.
          </p>
        </div>
        <div className="service-item">
          <h2>Access Monitoring</h2>
          <p>
            Real-time monitoring of access activity to ensure the highest level of security.
          </p>
        </div>
        <div className="service-item">
          <h2>Role Customization</h2>
          <p>
            Customize roles with specific permissions tailored to your organization's needs.
          </p>
        </div>
        <div className="service-item">
          <h2>Audit Reports</h2>
          <p>
            Generate comprehensive reports to meet compliance and auditing requirements.
          </p>
        </div>
        <div className="service-item">
          <h2>Role Customization</h2>
          <p>
            Customize roles with specific permissions tailored to your organization's needs.
          </p>
        </div>
      </section>
    </div>
  );
}

export default ServicesPage;
