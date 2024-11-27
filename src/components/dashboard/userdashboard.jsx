import React, { useState } from "react";
import "../../cssfiles/dashboard/userdashboard.css";

function UserDashboard() {
  const [notifications, setNotifications] = useState([
    "Your profile was updated successfully.",
    "New permission request is under review.",
    "Your latest article was approved.",
  ]);

  const recentActivities = [
    { action: "Edited a document", timestamp: "Today at 10:45 AM" },
    { action: "Uploaded a file", timestamp: "Yesterday at 2:30 PM" },
    { action: "Requested new permissions", timestamp: "2 days ago" },
  ];

  const deadlines = [
    { task: "Submit monthly report", dueDate: "Nov 30, 2024" },
    { task: "Team presentation", dueDate: "Dec 5, 2024" },
  ];

  const teamMembers = [
    { name: "Alice", role: "Project Manager" },
    { name: "Bob", role: "Developer" },
    { name: "Charlie", role: "Designer" },
  ];

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <h1>Welcome, User</h1>
        <p className="greeting">Here's an overview of your activity and tasks.</p>
      </header>

      {/* User Stats Section */}
      <section className="dashboard-stats">
        <div className="stat-card">
          <h2>Your Role</h2>
          <p>Editor</p>
        </div>
        <div className="stat-card">
          <h2>Permissions</h2>
          <p>Read, Write</p>
        </div>
        <div className="stat-card">
          <h2>Projects Assigned</h2>
          <p>3 Active Projects</p>
        </div>
      </section>

      {/* Progress Tracker */}
      <section className="dashboard-progress">
        <h2>Progress Tracker</h2>
        <ul>
          <li className="progress-item">
            <strong>Project Alpha</strong>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: "70%" }}></div>
            </div>
            <span>70% Completed</span>
          </li>
          <li className="progress-item">
            <strong>Website Redesign</strong>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: "40%" }}></div>
            </div>
            <span>40% Completed</span>
          </li>
        </ul>
      </section>

      {/* Notifications */}
      <section className="dashboard-notifications">
        <h2>Notifications</h2>
        <ul>
          {notifications.length > 0 ? (
            notifications.map((note, index) => (
              <li key={index} className="notification-item">
                {note}
              </li>
            ))
          ) : (
            <p>No new notifications.</p>
          )}
        </ul>
      </section>

      {/* Recent Activities */}
      <section className="dashboard-recent-activities">
        <h2>Recent Activities</h2>
        <ul>
          {recentActivities.map((activity, index) => (
            <li key={index} className="activity-item">
              <strong>{activity.action}</strong>
              <span>{activity.timestamp}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Upcoming Deadlines */}
      <section className="dashboard-deadlines">
        <h2>Upcoming Deadlines</h2>
        <ul>
          {deadlines.map((deadline, index) => (
            <li key={index} className="deadline-item">
              <strong>{deadline.task}</strong>
              <span>{deadline.dueDate}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Team Collaboration */}
      <section className="dashboard-team">
        <h2>Team Collaboration</h2>
        <ul>
          {teamMembers.map((member, index) => (
            <li key={index} className="team-member">
              <strong>{member.name}</strong>
              <span>{member.role}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Tips/Insights */}
      <section className="dashboard-tips">
        <h2>Tips & Insights</h2>
        <p>Did you know? Consistently updating your profile improves team coordination by 30%!</p>
      </section>

      {/* Action Buttons */}
      <section className="dashboard-actions">
        <h2>Quick Actions</h2>
        <div className="action-buttons">
          <button className="action-btn">View Profile</button>
          <button className="action-btn">Request Permissions</button>
          <button className="action-btn">Manage Projects</button>
          <button className="action-btn">Settings</button>
        </div>
      </section>
    </div>
  );
}

export default UserDashboard;
