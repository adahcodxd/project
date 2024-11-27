import React, { useState, useEffect } from "react";
import "../../cssfiles/pages/userprofile.css";

function UserProfile() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [newProfilePic, setNewProfilePic] = useState(null);
  const [recentActivities, setRecentActivities] = useState([]);
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
  });
  const [statistics, setStatistics] = useState({
    posts: 12,
    followers: 150,
    following: 80,
  });
  const [socialConnections, setSocialConnections] = useState([
    { name: "John Doe", status: "Friend" },
    { name: "Jane Smith", status: "Follower" },
  ]);

  useEffect(() => {
    // Simulated fetch for user data
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUsername(user.username);
      setEmail(user.email || 'example@example.com');
      setProfilePic(user.profilePic || 'https://via.placeholder.com/150');
      setRecentActivities(user.recentActivities || [
        "Logged in",
        "Updated profile",
        "Joined a group",
      ]);
      setStatistics(user.statistics || { posts: 12, followers: 150, following: 80 });
      setSocialConnections(user.socialConnections || [
        { name: "John Doe", status: "Friend" },
        { name: "Jane Smith", status: "Follower" },
      ]);
    }
  }, []);

  const handleSettingsChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="user-profile-page">
      <div className="dashboard-header">
        <h1>Welcome, {username}</h1>
        <img src={newProfilePic || profilePic} alt="Profile" className="dashboard-profile-pic" />
      </div>

      <div className="dashboard-main">
        <div className="dashboard-sidebar">
          <ul>
            <li><a href="#profile-section">Profile</a></li>
            <li><a href="#activity-section">Recent Activities</a></li>
            <li><a href="#statistics-section">Statistics</a></li>
            <li><a href="#connections-section">Connections</a></li>
            <li><a href="#settings-section">Settings</a></li>
            <li><a href="#quick-actions-section">Quick Actions</a></li>
            <li><a href="#recent-messages-section">Recent Messages</a></li>
          </ul>
        </div>

        <div className="dashboard-content">
          <section id="profile-section" className="profile-section">
            <h2>Profile</h2>
            <p><strong>Username:</strong> {username}</p>
            <p><strong>Email:</strong> {email}</p>
          </section>

          <section id="activity-section" className="activity-section">
            <h2>Recent Activities</h2>
            <ul className="activity-list">
              {recentActivities.map((activity, index) => (
                <li key={index}>{activity}</li>
              ))}
            </ul>
          </section>

          <section id="statistics-section" className="statistics-section">
            <h2>Statistics</h2>
            <div className="statistics-grid">
              <div><strong>Posts:</strong> {statistics.posts}</div>
              <div><strong>Followers:</strong> {statistics.followers}</div>
              <div><strong>Following:</strong> {statistics.following}</div>
            </div>
          </section>

          <section id="connections-section" className="connections-section">
            <h2>Connections</h2>
            <ul className="connections-list">
              {socialConnections.map((connection, index) => (
                <li key={index}>
                  {connection.name} - <em>{connection.status}</em>
                </li>
              ))}
            </ul>
          </section>

          <div className="actions-and-messages">
            <section id="quick-actions-section" className="quick-actions-section">
              <h2 className="section-title">Quick Actions</h2>
              <div className="quick-actions-grid">
                <button className="quick-action-btn">Create Post</button>
                <button className="quick-action-btn">Send Message</button>
                <button className="quick-action-btn">Follow User</button>
              </div>
            </section>

            <section id="recent-messages-section" className="recent-messages-section">
              <h2 className="section-title">Recent Messages</h2>
              <ul className="recent-messages-list">
                <li className="recent-message-item">Message from John Doe</li>
                <li className="recent-message-item">Message from Jane Smith</li>
                <li className="recent-message-item">Message from Alice Johnson</li>
              </ul>
            </section>
          </div>

          <section id="settings-section" className="settings-section">
            <h2>Settings</h2>
            <div className="settings-item">
              <label>
                <input
                  type="checkbox"
                  checked={settings.notifications}
                  onChange={(e) => handleSettingsChange('notifications', e.target.checked)}
                />
                Enable Notifications
              </label>
            </div>
            <div className="settings-item">
              <label>
                <input
                  type="checkbox"
                  checked={settings.darkMode}
                  onChange={(e) => handleSettingsChange('darkMode', e.target.checked)}
                />
                Dark Mode
              </label>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
