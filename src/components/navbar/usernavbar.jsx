import React from "react";
import { Link } from "react-router-dom";
import "../../cssfiles/navbar/user.css";

function UserNavbar() {
  return (
    <nav className="user-navbar">
      <div className="navbar-brand">
        <h1>User Dashboard</h1>
      </div>
      <ul className="navbar-links">
        <li><Link to="/user-dashboard">Home</Link></li>
        <li><Link to="/userprofile">My Profile</Link></li>
        <li><Link to="/access">My Permissions</Link></li>
        <li><Link to="/settings">Settings</Link></li>
        <li class="logout-btn"><Link to="/logout">Logout</Link></li>
      </ul>
    </nav>
  );
}

export default UserNavbar;
