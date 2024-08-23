import React from "react";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./UserContext";
function ProtectedRoute({ children }) {
  const { user, ready } = useContext(UserContext);

  if (!ready) {
    return <div>Loading...</div>; // You can show a loading screen while checking session
  }

  if (!user) {
    return <Navigate to="/login" />; // Redirect to login if not authenticated
  }

  return children; // Render protected components if authenticated
}

export default ProtectedRoute;
