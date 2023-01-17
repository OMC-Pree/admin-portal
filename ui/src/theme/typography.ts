import { TypographyOptions } from "@mui/material/styles/createTypography";
import React from "react";
import { COLOURS } from "./colours";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    hyperlink: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    hyperlink: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    hyperlink: true;
    body2: false;
    subtitle2: false;
  }
}

// "1rem" is equal to the browser font size, the default being 16px

const typography: TypographyOptions = {
  button: {
    fontWeight: 700,
    fontSize: 12,
    lineHeight: "170%",
    letterSpacing: "0.01rem",
  },
  h1: {
    fontSize: 64,
    fontWeight: 400,
    color: COLOURS.GREY[800],
    lineHeight: "140%",
    letterSpacing: "-0.04rem",
  },
  h2: {
    fontWeight: 400,
    fontSize: 48,
    color: COLOURS.GREY[800],
    lineHeight: "140%",
    letterSpacing: "-0.04rem",
    paddingLeft: "4px",
  },
  h3: {
    fontWeight: 400,
    color: COLOURS.GREY[800],
    fontSize: 32,
    lineHeight: "140%",
    letterSpacing: "-0.04rem",
  },
  h4: {
    fontWeight: 400,
    color: COLOURS.GREY[800],
    fontSize: 24,
    lineHeight: "150%",
    letterSpacing: "-0.03rem",
  },
  h5: {
    fontWeight: 400,
    color: COLOURS.GREY[800],
    fontSize: 18,
    lineHeight: "150%",
    letterSpacing: "-0.03rem",
  },
  h6: {
    fontWeight: 400,
    color: COLOURS.GREY[800],
    fontSize: 16,
    lineHeight: "150%",
    letterSpacing: "-0.03rem",
  },
  body1: {
    fontWeight: 400,
    color: COLOURS.GREY[800],
    fontSize: 14,
    lineHeight: "160%",
    letterSpacing: "-0.017rem",
  },
  body2: undefined,
  hyperlink: {
    fontWeight: 400,
    fontSize: 14,
    lineHeight: "170%",
    letterSpacing: "-0.017rem",
    color: COLOURS.PINK[600],
  },
  subtitle1: {
    fontWeight: 400,
    color: COLOURS.GREY[800],
    fontSize: 12,
    lineHeight: "160%",
    letterSpacing: "-0.017rem",
  },
  subtitle2: undefined,
  caption: {
    fontSize: 10,
    color: COLOURS.GREY[800],
    fontWeight: 400,
    lineHeight: "130%",
    letterSpacing: "-0.017rem",
  },
  overline: {
    fontSize: 8,
    color: COLOURS.GREY[800],
    fontWeight: 400,
    lineHeight: "130%",
    letterSpacing: "-0.01rem",
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
