import { COLOURS } from "../colours";

export const MuiTabs = {
  styleOverrides: {
    root: {
      backgroundColor: COLOURS.WHITE,
      color: COLOURS.WHITE,
      minHeight: "30px",
      borderBottom: `2px solid ${COLOURS.GREY[200]}`,
      "& .MuiTabs-indicator": {
        display: "none",
      },
    },
  },
};

export const MuiTab = {
  styleOverrides: {
    root: {
      color: COLOURS.GREY[600],
      fontWeight: 700,
      "&.Mui-selected": {
        color: COLOURS.INDIGO[700],
        borderBottom: `2px solid ${COLOURS.INDIGO[700]}`,
      },
      paddingTop: 0,
      paddingBottom: 0,
      "&.MuiButtonBase-root": {
        minHeight: "36px",
      },
    },
  },
};

export default {
  MuiTab,
  MuiTabs,
};
