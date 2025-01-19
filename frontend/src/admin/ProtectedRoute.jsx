import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const location = useLocation();

  // If the user is not authenticated and not on the login or register page
  if (!isAuthenticated && !location.pathname.includes("/login") && !location.pathname.includes("/register")) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // Redirect non-admin users from admin-only routes
  if (!user?.isAdmin) {
    return <Navigate to="/login" replace />;
  }

  // Render the protected content
  return children;
};

export default ProtectedRoute;
