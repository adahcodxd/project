import "../../cssfiles/dashboard/admindashboard.css";
import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

function AdminDashboard() {
  const [notifications, setNotifications] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [showWidgets, setShowWidgets] = useState({
    stats: true,
    notifications: true,
    activities: true,
  });

  const [profile, setProfile] = useState({
    name: "Admin User",
    email: "admin@domain.com",
    role: "Super Admin",
    profilePicture: "default-avatar.png",
  });

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setNotifications([
        "5 new users registered.",
        "System backup completed successfully.",
        "Admin role updated for user: John Doe.",
      ]);

      setRecentActivities([
        { action: "Logged into the dashboard", timestamp: "10:30 AM" },
        { action: "Approved user request", timestamp: "9:00 AM" },
        { action: "Generated monthly report", timestamp: "Yesterday" },
      ]);
    }, 1500);
  }, []);

  const toggleWidget = (widget) => {
    setShowWidgets((prev) => ({
      ...prev,
      [widget]: !prev[widget],
    }));
  };

  return (
    <div className={`admin-dashboard-new ${darkMode ? "dark-mode" : ""}`}>
      {/* Header */}
      <header className="admin-header-new">
        <h1>Welcome, {profile.name}</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="dark-mode-toggle"
        >
          Toggle {darkMode ? "Light" : "Dark"} Mode
        </button>
      </header>

      {/* Profile Section */}
      <section className="profile-section-new">
        <img
          src={profile.profilePicture}
          alt="Profile"
          className="profile-image-new"
        />
        <div className="profile-info-new">
          <h2>{profile.name}</h2>
          <p>Email: {profile.email}</p>
          <p>Role: {profile.role}</p>
        </div>
      </section>

      {/* Stats Section */}
      {showWidgets.stats && (
        <section className="stats-section-new">
          <div className="stat-card-new">
            <h3>Total Users</h3>
            <p>150</p>
          </div>
          <div className="stat-card-new">
            <h3>Roles</h3>
            <p>12</p>
          </div>
          <div className="stat-card-new">
            <h3>Active Sessions</h3>
            <p>45</p>
          </div>
        </section>
      )}
      <button
        className="toggle-widget-new"
        onClick={() => toggleWidget("stats")}
      >
        {showWidgets.stats ? "Hide Stats" : "Show Stats"}
      </button>

      {/* Notifications Section */}
      {showWidgets.notifications && (
        <section className="notifications-section-new">
          <h2>Notifications</h2>
          <ul>
            {notifications.map((notification, index) => (
              <li key={index}>{notification}</li>
            ))}
          </ul>
        </section>
      )}
      <button
        className="toggle-widget-new"
        onClick={() => toggleWidget("notifications")}
      >
        {showWidgets.notifications
          ? "Hide Notifications"
          : "Show Notifications"}
      </button>

      {/* Recent Activities Section */}
      {showWidgets.activities && (
        <section className="activities-section-new">
          <h2>Recent Activities</h2>
          <ul>
            {recentActivities.map((activity, index) => (
              <li key={index}>
                {activity.action} - {activity.timestamp}
              </li>
            ))}
          </ul>
        </section>
      )}
      <button
        className="toggle-widget-new"
        onClick={() => toggleWidget("activities")}
      >
        {showWidgets.activities ? "Hide Activities" : "Show Activities"}
      </button>
    </div>
  );
}

export default AdminDashboard;
