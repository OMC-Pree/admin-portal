import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useMyAccountQuery } from "../../api/users";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { IdpErrorResponse } from "../../models/httpCalls";
import { IUser } from "../user/userModels";
import { UserPermissions } from "../user/userEnums";
import { logout, selectCurrentUser, selectToken, setUser } from "./authSlice";

interface IUseAuthReturnValues {
  user: IUser | null;
  token: string | null;
  isFetchingUser: boolean;
  getUserError: boolean;
  userLoaded: boolean;
  isCoach: boolean;
  isManager: boolean;
  isAdmin: boolean;
  logout: () => void;
}

function useAuth(): IUseAuthReturnValues {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const storedUser = useAppSelector(selectCurrentUser);
  const token = useAppSelector(selectToken);
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
      isCoach: storedUser ? storedUser.permissions.includes(UserPermissions.COACH) : false,
      isManager: storedUser ? storedUser.permissions.includes(UserPermissions.MANAGER) : false,
      isAdmin: !!storedUser?.permissions.includes(UserPermissions.ADMIN),
      logout: onLogout,
    }),
    [storedUser, token, isFetching, isError, isSuccess],
  );
}

export default useAuth;
