import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function RequireAuth({ children }: { children: JSX.Element }) {
  const { user, isFetchingUser } = useAuth();
  const location = useLocation();

  if (!user && !isFetchingUser) return <Navigate to="/login" state={{ from: location }} replace />;

  return children;
}

export default RequireAuth;
