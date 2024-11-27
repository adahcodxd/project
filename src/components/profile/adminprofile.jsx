import React, { useState, useEffect } from "react";
import "../../cssfiles/pages/adminprofile.css"; // Ensure you have the associated CSS file

function AdminProfile() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [theme, setTheme] = useState("light");
  const [role, setRole] = useState("Admin");
  const [lastLogin, setLastLogin] = useState("2024-11-24 12:30 PM");
  const [loading, setLoading] = useState(true);

  // Simulating fetching user data from a service (could be replaced with actual data fetching logic)
  useEffect(() => {
    const adminData = JSON.parse(localStorage.getItem("user"));
    if (adminData) {
      setUsername(adminData.username);
      setEmail(adminData.email || "admin@example.com");
      setProfilePic(adminData.profilePic || null);
      setRole(adminData.role || "Admin");
      setLastLogin(adminData.lastLogin || "2024-11-24 12:30 PM");
    }
    setLoading(false);
  }, []);

  // Handle theme change (light/dark)
  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  // Handle form submission for settings change
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile updated successfully!");
    // Implement save logic here (e.g., save to API or localStorage)
  };

  // Handle password change
  const handlePasswordChange = () => {
    alert("Password change functionality is under development!");
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login"; // Redirect to login page
  };

  return (
    <div className={`admin-profile-page ${theme}`}>
      <div className="admin-profile-container">
        <h1>Admin Profile</h1>
        <p>Manage your profile information and settings.</p>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            {/* Profile Information Card */}
            <div className="profile-card">
              <div className="profile-picture-section">
                <label>Profile Picture</label>
                <div className="profile-picture-wrapper">
                  {profilePic ? (
                    <img
                      src={profilePic}
                      alt="Profile"
                      className="profile-preview"
                    />
                  ) : (
                    <div className="profile-placeholder">No Image</div>
                  )}
                </div>
              </div>

              {/* Display User Information */}
              <div className="profile-info">
                <div className="profile-field">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled
                  />
                </div>

                <div className="profile-field">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled
                  />
                </div>

                <div className="profile-field">
                  <label htmlFor="role">Role</label>
                  <input
                    type="text"
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    disabled
                  />
                </div>

                <div className="profile-field">
                  <label htmlFor="lastLogin">Last Login</label>
                  <input
                    type="text"
                    id="lastLogin"
                    value={lastLogin}
                    onChange={(e) => setLastLogin(e.target.value)}
                    disabled
                  />
                </div>

                {/* Theme Selection */}
                <div className="profile-field">
                  <label htmlFor="theme">Theme</label>
                  <select
                    id="theme"
                    value={theme}
                    onChange={handleThemeChange}
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                  </select>
                </div>
              </div>

              {/* Password Change Button */}
              <div className="profile-actions">
                <button
                  type="button"
                  onClick={handlePasswordChange}
                  className="save-btn"
                >
                  Change Password
                </button>
              </div>

              {/* Logout Button */}
              <div className="profile-actions">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="save-btn"
                >
                  Logout
                </button>
              </div>
            </div>

            {/* Edit Profile Settings Button */}
            <div className="profile-actions">
              <button
                type="button"
                onClick={() => (window.location.href = "/settings")}
                className="save-btn"
              >
                Edit Profile
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminProfile;
