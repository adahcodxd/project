import React, { useState, useEffect } from "react";
import "../../cssfiles/pages/settings.css";

function Settings() {
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
    newPassword: "",
    confirmPassword: "",
    bio: "",
    dob: "", // Date of Birth
  });

  const [profilePicture, setProfilePicture] = useState(null);
  const [previewPicture, setPreviewPicture] = useState(null);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    // Load user settings from localStorage (or API)
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUserDetails({
        ...userDetails,
        username: storedUser.username || "",
        email: storedUser.email || "",
        bio: storedUser.bio || "",
        dob: storedUser.dob || "", // Loading saved dob
      });
      setProfilePicture(storedUser.profilePicture || null);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setFeedback("Image size should not exceed 5MB.");
        return;
      }
      setProfilePicture(file);
      setPreviewPicture(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (userDetails.newPassword !== userDetails.confirmPassword) {
      setFeedback("Passwords do not match.");
      return;
    }

    const updatedUser = {
      username: userDetails.username,
      email: userDetails.email,
      bio: userDetails.bio,
      dob: userDetails.dob,
      profilePicture,
    };

    // Save to localStorage (or send to API)
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setFeedback("Settings have been updated!");
  };

  return (
    <div className={`settings-page ${userDetails.theme}`}>
      <div className="settings-container">
        <h1>Account Settings</h1>
        <p>Manage your preferences, profile, and account details.</p>

        {feedback && <div className="feedback-message">{feedback}</div>}

        <form onSubmit={handleSubmit} className="settings-form">
          {/* Profile Picture Section */}
          <div className="settings-field profile-picture">
            <label htmlFor="profilePicture">Profile Picture</label>
            <div className="profile-picture-wrapper">
              {previewPicture ? (
                <img src={previewPicture} alt="Profile Preview" className="profile-preview" />
              ) : (
                <div className="profile-placeholder">No Profile Picture</div>
              )}
              <input
                type="file"
                id="profilePicture"
                accept="image/*"
                onChange={handleProfilePictureChange}
              />
            </div>
          </div>

          {/* Username Field */}
          <div className="settings-field">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={userDetails.username}
              onChange={handleInputChange}
              placeholder="Enter new username"
            />
          </div>

          {/* Email Field */}
          <div className="settings-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={userDetails.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
            />
          </div>

          {/* Password Change Section */}
          <div className="settings-field">
            <label htmlFor="password">Current Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={userDetails.password}
              onChange={handleInputChange}
              placeholder="Enter current password"
            />
          </div>
          <div className="settings-field">
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={userDetails.newPassword}
              onChange={handleInputChange}
              placeholder="Enter new password"
            />
          </div>
          <div className="settings-field">
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={userDetails.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm new password"
            />
          </div>

          {/* Date of Birth Field */}
          <div className="settings-field">
            <label htmlFor="dob">Date of Birth</label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={userDetails.dob}
              onChange={handleInputChange}
            />
          </div>

          {/* Bio Field */}


          {/* Save Button */}
          <div className="settings-actions">
            <button type="submit" className="save-btn">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Settings;
