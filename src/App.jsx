import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Login from "./components/auth/login";
import  "./app.css";
import Signup from "./components/auth/signup";
import AdminDashboard from "./components/dashboard/admindashboard";
import UserDashboard from "./components/dashboard/userdashboard";
import AuthWrapper from "./components/auth/authwrapper";
import AdminNavbar from "./components/navbar/adminnavbar";
import UserNavbar from "./components/navbar/usernavbar";
import HomeNavbar from "./components/navbar/homenavbar";
import HomePage from "./components/pages/homepage";
import NotFound from "./components/pages/notfound";
import Settings from "./components/pages/settings";
import RoleManagement from "./components/roles/rolemanagement";
import PermissionManagement from "./components/roles/permissionmanagement";
import ManageUsers from "./components/roles/manageuser";
import AdminProfile from "./components/profile/adminprofile";
import UserProfile from "./components/profile/userprofile";
import UserProfilePermissions from "./components/users/mypermissions";
import LogoutPage from "./components/auth/logout";
import SystemNotifications from "./components/pages/systemnotifications";
import AboutPage from "./components/pages/aboutpage";
import ContactPage from "./components/pages/contactpage";
import ServicesPage from "./components/pages/servicepage";

function AppContent() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Load user from localStorage on app start
    const loggedUser = localStorage.getItem("user");
    if (loggedUser) {
      setUser(JSON.parse(loggedUser));
    }
  }, []);
  const handleLogin = (e) => {
    e.preventDefault();
  
    const mockUsers = [
      { id: 1, email: "admin@example.com", password: "admin123", role: "admin" },
      { id: 2, email: "user@example.com", password: "user123", role: "user" },
    ];
  
    const user = mockUsers.find((u) => u.email === email && u.password === password);
  
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      window.location.reload(); // Refresh the page after login
    } else {
      setError("Invalid email or password.");
    }
  };
  
  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  // Render navbar conditionally based on route
  const renderNavbar = () => {
    const location = useLocation();

    if (
      location.pathname === "/" ||
      location.pathname === "/login" ||
      location.pathname === "/signup" ||
      location.pathname === "/about" ||
      location.pathname === "/contact" ||
      location.pathname === "/services"
    ) {
      return <HomeNavbar />;
    }

    if (user?.role === "admin") {
      return <AdminNavbar onLogout={handleLogout} />;
    }

    if (user?.role === "user") {
      return <UserNavbar onLogout={handleLogout} />;
    }

    return <HomeNavbar />;
  };

  return (
    <>
      {renderNavbar()}
      <div className="app-content">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/signup" element={<Signup setUser={setUser} />} />
          <Route path="/logout" element={<LogoutPage setUser={setUser} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/services" element={<ServicesPage />} />

          {/* Admin Protected Routes */}
          {user?.role === "admin" && (
            <>
              <Route
                path="/admin-dashboard"
                element={
                  <AuthWrapper requiredRole="admin">
                    <AdminDashboard />
                  </AuthWrapper>
                }
              />
              <Route
                path="/roles"
                element={
                  <AuthWrapper requiredRole="admin">
                    <RoleManagement />
                  </AuthWrapper>
                }
              />
              <Route
                path="/system-notifications"
                element={
                  <AuthWrapper requiredRole="admin">
                    <SystemNotifications />
                  </AuthWrapper>
                }
              />
              <Route
                path="/permissions"
                element={
                  <AuthWrapper requiredRole="admin">
                    <PermissionManagement />
                  </AuthWrapper>
                }
              />
              <Route
                path="/manage-users"
                element={
                  <AuthWrapper requiredRole="admin">
                    <ManageUsers />
                  </AuthWrapper>
                }
              />
              <Route
                path="/admin-profile"
                element={
                  <AuthWrapper requiredRole="admin">
                    <AdminProfile />
                  </AuthWrapper>
                }
              />
            </>
          )}

          {/* User Protected Routes */}
          {user?.role === "user" && (
            <>
              <Route
                path="/user-dashboard"
                element={
                  <AuthWrapper requiredRole="user">
                    <UserDashboard />
                  </AuthWrapper>
                }
              />
              <Route
                path="/userprofile"
                element={
                  <AuthWrapper requiredRole="user">
                    <UserProfile />
                  </AuthWrapper>
                }
              />
              <Route
                path="/access"
                element={
                  <AuthWrapper requiredRole="user">
                    <UserProfilePermissions />
                  </AuthWrapper>
                }
              />
            </>
          )}

          {/* Shared Routes */}
          <Route path="/settings" element={<Settings />} />

          {/* Catch-All Route */}

        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;