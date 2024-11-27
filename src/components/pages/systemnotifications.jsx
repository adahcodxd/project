import React, { useState, useEffect } from "react";
import "../../cssfiles/pages/systemnotifcations.css";

const SystemNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [newNotification, setNewNotification] = useState({
    message: "",
    level: "info", // info, warning, critical
    scheduledTime: "",
  });
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    // Simulate fetching notifications (replace with actual API call)
    setNotifications([
      {
        id: 1,
        message: "System maintenance scheduled for midnight.",
        level: "info",
        date: "2024-11-25T10:00:00",
      },
      {
        id: 2,
        message: "Security breach detected, please change your password.",
        level: "critical",
        date: "2024-11-24T08:00:00",
      },
      // More notifications
    ]);
  }, []);

  const handleNewNotificationChange = (e) => {
    const { name, value } = e.target;
    setNewNotification((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateNotification = () => {
    // Add the new notification (replace with actual API call)
    setNotifications((prev) => [
      ...prev,
      {
        id: Date.now(),
        message: newNotification.message,
        level: newNotification.level,
        date: new Date().toISOString(),
      },
    ]);
    setNewNotification({ message: "", level: "info", scheduledTime: "" });
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  // Filter notifications by level (info, warning, critical)
  const filteredNotifications = notifications.filter((notification) =>
    filter === "all" ? true : notification.level === filter
  );

  return (
    <div className="system-notifications-page">
      <h1>System Notifications</h1>

      {/* Filter options */}
      <div className="filter-options">
        <label>Filter by Level:</label>
        <select onChange={handleFilterChange} value={filter}>
          <option value="all">All</option>
          <option value="info">Info</option>
          <option value="warning">Warning</option>
          <option value="critical">Critical</option>
        </select>
      </div>

      {/* Notification List */}
      <div className="notification-list">
        {filteredNotifications.map((notification) => (
          <div
            key={notification.id}
            className={`notification-item ${notification.level}`}
          >
            <p className="message">{notification.message}</p>
            <span className="date">{new Date(notification.date).toLocaleString()}</span>
          </div>
        ))}
      </div>

      {/* Create Notification */}
      <div className="create-notification">
        <h3>Create New Notification</h3>
        <textarea
          name="message"
          placeholder="Enter notification message"
          value={newNotification.message}
          onChange={handleNewNotificationChange}
        />
        <select
          name="level"
          value={newNotification.level}
          onChange={handleNewNotificationChange}
        >
          <option value="info">Info</option>
          <option value="warning">Warning</option>
          <option value="critical">Critical</option>
        </select>
        <input
          type="datetime-local"
          name="scheduledTime"
          value={newNotification.scheduledTime}
          onChange={handleNewNotificationChange}
        />
        <button onClick={handleCreateNotification}>Create Notification</button>
      </div>
    </div>
  );
};

export default SystemNotifications;
