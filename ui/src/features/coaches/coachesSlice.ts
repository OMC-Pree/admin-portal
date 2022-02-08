import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { uniqBy } from "lodash";
import { RootState } from "../../app/store";
import { IUser } from "../../models/user";

type CoachesState = {
  coaches: IUser[];
  clients: IUser[];
};

const slice = createSlice({
  name: "coaches",
  initialState: { coaches: [], clients: [] } as CoachesState,
  reducers: {
    setCoaches: (state, { payload }: PayloadAction<IUser[]>) => {
      state.coaches = payload;
    },
    addCoaches: (state, { payload }: PayloadAction<IUser[]>) => {
      state.coaches = uniqBy(state.coaches.concat(payload), "id");
    },
    setClients: (state, { payload }: PayloadAction<IUser[]>) => {
      state.clients = payload;
    },
  },
});

export const { addCoaches, setCoaches, setClients } = slice.actions;

export default slice.reducer;

export const selectClients = (state: RootState): IUser[] => state.coaches.clients;
export const selectCoaches = (state: RootState): IUser[] => state.coaches.coaches;
