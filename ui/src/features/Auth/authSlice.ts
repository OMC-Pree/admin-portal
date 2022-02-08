import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { LoginResponse } from "../../models/httpCalls";
import { IUser } from "../../models/user";

type AuthState = {
  user: IUser | null;
  token: string | null;
};

const slice = createSlice({
  name: "auth",
  initialState: { user: null, token: null } as AuthState,
  reducers: {
    setToken: (state, { payload: { encryptedJWTToken } }: PayloadAction<LoginResponse>) => {
      state.token = encryptedJWTToken;
      localStorage.setItem("token", encryptedJWTToken);
    },
    setUser: (state, { payload }: PayloadAction<IUser>) => {
      state.user = payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.clear();
    },
  },
});

export const { setToken, setUser, logout } = slice.actions;

export default slice.reducer;

export const selectCurrentUser = (state: RootState): IUser | null => state.auth.user;

export const selectToken = (state: RootState): string | null => state.auth.token;
