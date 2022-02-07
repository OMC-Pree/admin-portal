import { COLOURS } from "../colours";

export const MuiTableContainer = {
  styleOverrides: {
    root: {
      backgroundColor: COLOURS.WHITE,
      border: `1px solid ${COLOURS.GREY[300]}`,
      borderTopLeftRadius: 4,
      borderTopRightRadius: 4,
    },
  },
};

export const MuiTableCell = {
  styleOverrides: {
    head: {
      color: COLOURS.GREY[500],
      backgroundColor: COLOURS.GREY[100],
    },
  },
};

export const MuiTablePagination = {
  styleOverrides: {
    root: {
      backgroundColor: COLOURS.GREY[200],
      border: `1px solid ${COLOURS.GREY[300]}`,
      borderTop: 0,
      borderBottomLeftRadius: 4,
      borderBottomRightRadius: 4,
    },
  },
};

export default {
  MuiTableContainer,
  MuiTableCell,
  MuiTablePagination,
};
