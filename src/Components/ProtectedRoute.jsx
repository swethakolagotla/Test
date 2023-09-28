/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("userName");

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
