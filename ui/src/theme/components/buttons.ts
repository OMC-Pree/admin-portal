import { COLOURS } from "../colours";

const MuiButton = {
  defaultProps: {
    disableRipple: true,
  },
  styleOverrides: {
    root: {
      padding: "6px 16px",
      [`&:disabled`]: {
        backgroundColor: COLOURS.GREY[300],
        color: COLOURS.GREY[500],
      },
    },
    text: {
      [`&:disabled`]: {
        backgroundColor: "transparent",
        color: COLOURS.GREY[500],
      },
    },
    sizeLarge: {
      padding: "8px 22px",
      fontWeight: 700,
    },
  },
};

const MuiIconButton = {
  styleOverrides: {
    root: {
      color: COLOURS.INDIGO[500],
      "& [data-testid='DateRangeIcon']": {
        color: COLOURS.GREY[600],
      },
    },
  },
};

export default {
  MuiButton,
  MuiIconButton,
};
