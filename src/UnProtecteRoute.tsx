import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';
import { makeSelectUser } from "./containers/User/selectors"

const ProtectedRoute = () => {
  const user = useSelector(makeSelectUser())
  return user.username ? <Navigate to="/" /> : <Outlet />;
};

export default ProtectedRoute;