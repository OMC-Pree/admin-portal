import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { uniqBy } from "lodash";
import { RootState } from "../../app/store";
import { IUser } from "../user/user";
import { sortUsersByKey } from "../user/userSorters";
import { ManagersState } from "./manager";

const sorter = sortUsersByKey("lastName");

const slice = createSlice({
  name: "managers",
  initialState: { managers: [], coaches: [] } as ManagersState,
  reducers: {
    setManagers: (state, { payload }: PayloadAction<IUser[]>) => {
      state.managers = payload.sort(sorter);
    },
    addManagers: (state, { payload }: PayloadAction<IUser[]>) => {
      state.managers = uniqBy(state.managers.concat(payload), "id").sort(sorter);
    },
    updateStoredManager: (state, { payload }: PayloadAction<Partial<IUser>>) => {
      state.managers = state.managers.map((coach) => {
        if (coach.id === payload.id) return { ...coach, ...payload };
        return coach;
      });
    },
  },
});

export const { addManagers, setManagers, updateStoredManager } = slice.actions;

export default slice.reducer;

export const selectManagers = (state: RootState): IUser[] => state.managers.managers;
