import React from "react";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./UserContext";
function ProtectedRoute({ children }) {
  const { user } = useContext(UserContext);

  if (!user) {
    // If no user, redirect to login page
    return <Navigate to="/login" />;
  }

  // If the user is authenticated, render the children (protected content)
  return children;
}

export default ProtectedRoute;
