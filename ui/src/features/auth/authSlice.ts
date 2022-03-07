import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { LoginResponse } from "../../models/httpCalls";
import { deleteCookie, setCookie } from "../../utils/cookie";
import { IUser } from "../user/user";

type AuthState = {
  user: IUser | null;
  token: string | null;
};

const slice = createSlice({
  name: "auth",
  initialState: { user: null, token: null } as AuthState,
  reducers: {
    setToken: (
      state,
      { payload: { encryptedJWTToken, tokenExpiry } }: PayloadAction<LoginResponse>,
    ) => {
      state.token = encryptedJWTToken;
      setCookie({ name: "token", value: encryptedJWTToken, expires: tokenExpiry });
    },
    setUser: (state, { payload }: PayloadAction<IUser>) => {
      state.user = payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      deleteCookie({ name: "token" });
    },
  },
});

export const { setToken, setUser, logout } = slice.actions;

export default slice.reducer;

export const selectCurrentUser = (state: RootState): IUser | null => state.auth.user;

export const selectToken = (state: RootState): string | null => state.auth.token;
