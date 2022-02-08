import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDecryptTokenQuery, useLoginMutation } from "../../api/auth";
import { useMyAccountQuery } from "../../api/users";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { IdpErrorResponse } from "../../models/httpCalls";
import { IUser, UserPermissions, UserType } from "../../models/user";
import { logout, selectCurrentUser, selectToken, setToken, setUser } from "./authSlice";

const ACCESS_DENIED_MESSAGE = "You do not have access";

interface IUseAuthReturnValues {
  user: IUser | null;
  token: string | null;
  isFetchingUser: boolean;
  getUserError: boolean;
  userLoaded: boolean;
  accessMessage: string;
  isCoach: boolean;
  signin: (data: { email: string; password: string }) => Promise<void>;
  logout: () => void;
}

function useAuth(): IUseAuthReturnValues {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const storedUser = useAppSelector(selectCurrentUser);
  const token = useAppSelector(selectToken);
  const [accessGranted, setAccessGranted] = useState(false);
  const [accessMessage, setAccessMessage] = useState("");
  const [login] = useLoginMutation();
  const { data: decryptTokenResponse } = useDecryptTokenQuery(token, { skip: !token });
  const {
    data: myAccountResponse,
    error,
    isError,
    isFetching,
    isSuccess,
  } = useMyAccountQuery(undefined, { skip: !accessGranted });

  useEffect(() => {
    if (!decryptTokenResponse) return;
    const {
      identityUser: { permissions },
    } = decryptTokenResponse;
    const hasPermission =
      permissions.includes(UserPermissions.UNSECURE_ROOT) ||
      permissions.includes(UserPermissions.ADMIN) ||
      permissions.includes(UserPermissions.MANAGER);
    setAccessGranted(hasPermission);
    if (!hasPermission) setAccessMessage(ACCESS_DENIED_MESSAGE);
  }, [decryptTokenResponse]);

  useEffect(() => {
    if (isSuccess && myAccountResponse) {
      dispatch(setUser(myAccountResponse.data[0]));
      return () => setAccessGranted(false);
    }
  }, [myAccountResponse, isSuccess]);

  useEffect(() => {
    if (isError && (error as IdpErrorResponse).status === 401) {
      onLogout();
    }
  }, [error, isError]);

  async function signin(data: { email: string; password: string }) {
    setAccessMessage("");
    try {
      const tokenData = await login(data).unwrap();
      dispatch(setToken(tokenData));
    } catch (error) {
      setAccessMessage(ACCESS_DENIED_MESSAGE);
    }
  }

  function onLogout() {
    setAccessGranted(false);
    dispatch(logout());
    navigate("/login");
  }

  return useMemo(
    () => ({
      user: storedUser,
      token,
      isFetchingUser: isFetching,
      getUserError: isError,
      userLoaded: isSuccess,
      accessMessage,
      isCoach: storedUser?.type === UserType.COACH,
      signin,
      logout: onLogout,
    }),
    [storedUser, token, isFetching, isError, isSuccess, accessMessage],
  );
}

export default useAuth;
