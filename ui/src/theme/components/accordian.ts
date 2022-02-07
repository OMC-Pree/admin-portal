import { COLOURS } from "../colours";

const MuiAccordion = {
  defaultProps: {
    disableGutters: true,
    square: true,
    elevation: 0,
  },
  styleOverrides: {
    root: {
      border: "none",
    },
  },
};

const MuiAccordionSummary = {
  styleOverrides: {
    root: {
      backgroundColor: COLOURS.WHITE,
      borderRadius: 0,
      fontWeight: 400,
      fontSize: "16px",
      color: COLOURS.BLUE[900],
      "& .MuiAccordionSummary-expandIconWrapper": {
        color: COLOURS.PINK[600],
      },
    },
  },
};

const MuiAccordionDetails = {
  styleOverrides: {
    root: {
      // borderBottom: "1px solid rgba(0, 0, 0, .125)",
    },
  },
};

export default {
  MuiAccordion,
  MuiAccordionSummary,
  MuiAccordionDetails,
};
