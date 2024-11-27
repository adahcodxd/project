import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/authcontext"; // Ensure you have this context

function AuthWrapper({ children, requiredRole }) {
  const { user } = useContext(AuthContext); // Access the user from context

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" />; // Redirect if the user's role doesn't match
  }

  return <>{children}</>;
}

export default AuthWrapper;
