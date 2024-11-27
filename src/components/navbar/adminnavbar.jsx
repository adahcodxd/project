import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authcontext"; // Ensure AuthContext is correctly set up
import "../../cssfiles/navbar/admin.css"; // Ensure the path is correct

function AdminNavbar() {
  const { logout } = useContext(AuthContext); // Ensure logout function exists in AuthContext
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Call logout from context
    navigate("/"); // Redirect to homepage after logout
  };

  return (
    <nav className="admin-navbar">
      <div className="navbar-brand">
        <h1>Admin Panel</h1>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/admin-dashboard" className="menu-item">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/admin-profile" className="menu-item">
            My Profile
          </Link>
        </li>
        <li>
          <Link to="/manage-users" className="menu-item">
            Manage Users
          </Link>
        </li>
        <li>
          <Link to="/roles" className="menu-item">
            Manage Roles
          </Link>
        </li>
        <li>
          <Link to="/permissions" className="menu-item">
            Permissions
          </Link>
        </li>
        <li>
          <Link to="/system-notifications" className="menu-item">
            System Notifications
          </Link>
        </li>
        <li>
          <Link to="/settings" className="menu-item">
            Settings
          </Link>
        </li>
        <li>
          <button onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}

// Wrapper Component for Admin Navbar
const AdminNavbarWrapper = ({ children }) => {
  return (
    <div className="admin-page">
      {/* Admin Navbar */}
      <AdminNavbar />
      {/* Main Content */}
      <div className="admin-content">{children}</div>
    </div>
  );
};

export default AdminNavbarWrapper;
