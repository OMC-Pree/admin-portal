import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

function RequireAuth({ children }: { children: JSX.Element | JSX.Element[] }) {
  const { user, isFetchingUser, getUserError, userLoaded } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (getUserError || (!isFetchingUser && !userLoaded && !user)) {
      navigate("/login", { state: { from: location } });
    }
  }, [user, isFetchingUser, getUserError, userLoaded]);

  if (!user) return null;

  return <>{children}</>;
}

export default RequireAuth;
