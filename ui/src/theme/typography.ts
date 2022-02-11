import { TypographyOptions } from "@mui/material/styles/createTypography";
import { COLOURS } from "./colours";

const typography: TypographyOptions = {
  button: {
    textTransform: "uppercase",
    fontWeight: 700,
  },
  h2: {
    fontWeight: 700,
    color: COLOURS.INDIGO[700],
    fontSize: "32px",
    lineHeight: "48px",
    paddingLeft: "4px",
  },
  h3: {
    fontWeight: 700,
    color: COLOURS.PURPLE[500],
    fontSize: "28px",
    paddingLeft: "4px",
  },
  h4: {
    fontWeight: 700,
    color: COLOURS.INDIGO[700],
    fontSize: "32px",
    lineHeight: "48px",
  },
  h5: {
    fontWeight: 400,
    color: COLOURS.INDIGO[700],
    fontSize: "20px",
    lineHeight: "30px",
  },
  h6: {
    fontWeight: 700,
    color: COLOURS.GREY[700],
    fontSize: 18,
  },
  body1: {
    fontWeight: 400,
    color: COLOURS.GREY[800],
    fontSize: 14,
  },
  body2: {
    fontWeight: 400,
    color: COLOURS.GREY[500],
    fontSize: 14,
  },
  subtitle1: {
    fontWeight: 400,
    color: COLOURS.GREY[800],
    fontSize: 16,
  },
  subtitle2: {
    fontWeight: 400,
    color: COLOURS.GREY[800],
    fontSize: 14,
  },

  fontFamily: [
    "BrownLLWeb",
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    '"Roboto"',
    '"Oxygen"',
    '"Ubuntu"',
    '"Cantarell"',
    '"Fira Sans"',
    '"Droid Sans"',
    '"Helvetica Neue"',
    "sans-serif",
  ].join(","),
};

export default typography;
