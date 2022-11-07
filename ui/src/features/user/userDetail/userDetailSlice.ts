import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import { IUser } from "../userModels";

type userDetailState = {
  user: IUser | undefined;
};

const slice = createSlice({
  name: "userDetail",
  initialState: { user: undefined } as userDetailState,
  reducers: {
    setDetailUser: (state, { payload }: PayloadAction<IUser>) => {
      state.user = payload;
    },
    updateDetailUser: (state, { payload }: PayloadAction<Partial<IUser>>) => {
      state.user = { ...state.user, ...payload } as IUser;
    },
  },
});

export const { setDetailUser, updateDetailUser } = slice.actions;

export default slice.reducer;

export const selectDetailUser = (state: RootState): IUser => state.userDetail.user;
