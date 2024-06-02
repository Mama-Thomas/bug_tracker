import React from "react";
import { Navigate } from "react-router-dom";
import authService from "../services/authService";

const PrivateRoute = ({ component: Component, roleid, ...rest }) => {
  const currentUser = authService.getCurrentUser();

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  if (roleid && !roleid.includes(currentUser.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return <Component {...rest} />;
};

export default PrivateRoute;
