import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLazyDecryptTokenQuery, useLoginMutation } from "../../api/auth";
import { useMyAccountQuery } from "../../api/users";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { IdpErrorResponse } from "../../models/httpCalls";
import { IUser } from "../user/userModels";
import { UserPermissions } from "../user/userEnums";
import { logout, selectCurrentUser, selectToken, setToken, setUser } from "./authSlice";

interface IUseAuthReturnValues {
  user: IUser | null;
  token: string | null;
  isFetchingUser: boolean;
  getUserError: boolean;
  userLoaded: boolean;
  accessMessage: string;
  isCoach: boolean;
  isManager: boolean;
  isAdmin: boolean;
  signin: (data: { email: string; password: string }) => Promise<void>;
  logout: () => void;
}

function useAuth(): IUseAuthReturnValues {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const storedUser = useAppSelector(selectCurrentUser);
  const token = useAppSelector(selectToken);
  const [accessMessage, setAccessMessage] = useState("");
  const [login] = useLoginMutation();
  const [decryptToken] = useLazyDecryptTokenQuery();
  const {
    data: myAccountResponse,
    error,
    isError,
    isFetching,
    isSuccess,
  } = useMyAccountQuery(undefined, { skip: !token });

  useEffect(() => {
    if (isSuccess && myAccountResponse) {
      dispatch(setUser(myAccountResponse.data[0]));
    }
  }, [myAccountResponse, isSuccess]);

  useEffect(() => {
    if (isError && (error as IdpErrorResponse).status === 401) {
      onLogout();
    }
  }, [error, isError]);

  async function onSignIn(data: { email: string; password: string }) {
    setAccessMessage("");
    try {
      const tokenData = await login(data).unwrap();
      const decryptedToken = await decryptToken(tokenData.encryptedJWTToken).unwrap();
      const {
        identityUser: { permissions },
      } = decryptedToken;
      const hasPermission =
        permissions.includes(UserPermissions.ADMIN) ||
        permissions.includes(UserPermissions.MANAGER);
      if (!hasPermission) throw new Error("unauthorised");
      dispatch(setToken(tokenData));
    } catch (error) {
      setAccessMessage("You do not have access");
    }
  }

  function onLogout() {
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
      isCoach: storedUser ? storedUser.permissions.includes(UserPermissions.COACH) : false,
      isManager: storedUser ? storedUser.permissions.includes(UserPermissions.MANAGER) : false,
      isAdmin: !!storedUser?.permissions.includes(UserPermissions.ADMIN),
      signin: onSignIn,
      logout: onLogout,
    }),
    [storedUser, token, isFetching, isError, isSuccess, accessMessage],
  );
}

export default useAuth;
