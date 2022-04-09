import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from 'react-redux';
import { makeSelectUser } from "./containers/User/selectors"
import React from "react";

interface ProtectedRouteTypes {
  redirectPath?: string;
  children: React.ReactElement;
}

const ProtectedRoute = ({
  redirectPath,
  children,
}: ProtectedRouteTypes) => {

  const user = useSelector(makeSelectUser())
  return user.username ? children : <Navigate to={redirectPath || "/auth/login"} />;

};

ProtectedRoute.propTypes = {
  redirectPath: PropTypes.string,
  children: PropTypes.element
}

export default ProtectedRoute;