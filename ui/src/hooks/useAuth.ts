import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "./store";
import {
  logout,
  selectCurrentUser,
  selectToken,
  setToken,
  setUser,
} from "../features/Auth/authSlice";
import { useMyAccountQuery } from "../api/users";
import { User, UserType } from "../models/user";
import { IdpErrorResponse } from "../models/httpCalls";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../api/auth";

interface IUseAuthReturnValues {
  user: User | null;
  token: string | null;
  isFetchingUser: boolean;
  isCoach: boolean;
  signin: (data: { email: string; password: string }) => Promise<void>;
}

export const useAuth = (): IUseAuthReturnValues => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectCurrentUser);
  const token = useAppSelector(selectToken);
  const [login] = useLoginMutation();

  const {
    data: userData,
    error,
    isError,
    isFetching,
    isSuccess,
  } = useMyAccountQuery(undefined, { skip: !token || !!user });

  useEffect(() => {
    if (isSuccess && userData) {
      dispatch(setUser(userData.data[0]));
    }
  }, [userData, isSuccess]);

  useEffect(() => {
    if (isError && (error as IdpErrorResponse).status === 401) {
      dispatch(logout());
      navigate("/login");
    }
  }, [error, isError]);

  async function signin(data: { email: string; password: string }) {
    const tokenData = await login(data).unwrap();
    dispatch(setToken(tokenData));
  }

  return useMemo(
    () => ({
      user,
      token,
      isFetchingUser: isFetching,
      isCoach: user?.type === UserType.COACH,
      signin,
    }),
    [user, token, isFetching],
  );
};
