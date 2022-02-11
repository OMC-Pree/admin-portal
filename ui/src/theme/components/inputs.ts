import { outlinedInputClasses, TextFieldProps } from "@mui/material";
import { COLOURS } from "../colours";

const defaultProps: TextFieldProps = {
  variant: "filled",
};

export const MuiTextField = {
  defaultProps,
  styleOverrides: {
    root: {
      paddingBottom: "4px",
      "&.Mui-error": {
        borderWidth: 2,
        borderColor: COLOURS.RED,
      },
      "&.Mui-focused": {
        borderWidth: 2,
        color: COLOURS.PURPLE[500],
        "&.Mui-error": {
          borderColor: COLOURS.RED,
        },
      },
    },
  },
};

export const MuiInputLabel = {
  styleOverrides: {
    root: {
      paddingBottom: "4px",
      "&.Mui-focused": {
        color: COLOURS.PURPLE[500],
        "&.Mui-error": {
          color: COLOURS.RED,
        },
      },
    },
  },
};

export const MuiFormHelperText = {
  styleOverrides: {
    root: {
      "&.Mui-focused": {
        color: COLOURS.PURPLE[500],
        "&.Mui-error": {
          color: COLOURS.RED,
        },
      },
    },
  },
};

export const MuiOutlinedInput = {
  styleOverrides: {
    root: {
      borderRadius: 6,
      "&:hover": {
        [`& .${outlinedInputClasses["notchedOutline"]}`]: {
          borderColor: COLOURS.PURPLE[500],
        },
      },
      "&.Mui-disabled": {
        [`& .${outlinedInputClasses["notchedOutline"]}`]: {
          borderColor: "rgba(0, 0, 0, 0.23)",
        },
      },
      "&.Mui-focused": {
        [`& .${outlinedInputClasses["notchedOutline"]}`]: {
          borderWidth: "1px",
          borderColor: COLOURS.PURPLE[500],
        },
      },
      "& .MuiSelect-select": {
        "&.MuiInputBase-inputSizeSmall": {
          color: "blue",
        },
      },
    },
  },
};

export const MuiFilledInput = {
  defaultProps: {
    disableUnderline: true,
  },
  styleOverrides: {
    root: {
      backgroundColor: COLOURS.WHITE,
      border: "1px solid rgba(0, 0, 0, 0.23)",
      borderRadius: 6,
      "&:hover": {
        backgroundColor: COLOURS.WHITE,
        borderColor: COLOURS.PURPLE[500],
      },
      "&.Mui-error": {
        borderWidth: 2,
        borderColor: COLOURS.RED,
      },
      "&.Mui-focused": {
        borderWidth: 2,
        backgroundColor: COLOURS.WHITE,
        borderColor: COLOURS.PURPLE[500],
        "&.Mui-error": {
          borderColor: COLOURS.RED,
        },
      },
    },
  },
};

export const MuiInput = {
  styleOverrides: {
    root: {
      border: "1px solid rgba(0, 0, 0, 0.23)",
      borderRadius: 6,
      padding: "4px 12px",
      "&:hover": {
        backgroundColor: COLOURS.WHITE,
        borderColor: COLOURS.PURPLE[500],
        "&.Mui-disabled": {
          borderColor: "rgba(0, 0, 0, 0.23)",
        },
      },
    },
  },
};

export default {
  MuiInputLabel,
  MuiFormHelperText,
  MuiTextField,
  MuiOutlinedInput,
  MuiFilledInput,
  MuiInput,
};
