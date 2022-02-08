import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { uniqBy } from "lodash";
import { RootState } from "../../app/store";
import { IUser } from "../../models/user";

type CoachesState = {
  users: IUser[];
};

const slice = createSlice({
  name: "coaches",
  initialState: { users: [] } as CoachesState,
  reducers: {
    setCoaches: (state, { payload }: PayloadAction<IUser[]>) => {
      state.users = payload;
    },
    addCoaches: (state, { payload }: PayloadAction<IUser[]>) => {
      state.users = uniqBy(state.users.concat(payload), "id");
    },
  },
});

export const { addCoaches, setCoaches } = slice.actions;

export default slice.reducer;

export const selectCoaches = (state: RootState): IUser[] => state.coaches.users;
