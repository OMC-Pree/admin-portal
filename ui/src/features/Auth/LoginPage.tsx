import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

interface ILocation {
  state: {
    from: {
      pathname: string;
    };
  };
}

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation() as ILocation;
  const { user, isFetchingUser, signin } = useAuth();

  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (user) navigate(from);
  }, [user]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) return;

    signin({ email, password });
  }

  if (isFetchingUser) return null;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Email: <input name="email" type="text" />
        </label>{" "}
        <label>
          Password: <input name="password" type="password" />
        </label>{" "}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
