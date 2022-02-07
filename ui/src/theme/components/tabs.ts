import { COLOURS } from "../colours";

export const MuiTabs = {
  styleOverrides: {
    root: {
      backgroundColor: COLOURS.PURPLE[500],
      color: COLOURS.WHITE,
      borderRadius: 6,
    },
  },
};

export const MuiTab = {
  styleOverrides: {
    root: {
      color: COLOURS.WHITE,
      fontWeight: 700,
      "&.Mui-selected": {},
    },
  },
};

export default {
  MuiTab,
  MuiTabs,
};
