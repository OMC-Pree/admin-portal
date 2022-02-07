import { PaletteOptions } from "@mui/material";
import { COLOURS } from "./colours";

const palette: PaletteOptions = {
  mode: "light",
  primary: {
    main: COLOURS.PINK[600],
    dark: COLOURS.PINK[800],
    contrastText: COLOURS.WHITE,
  },
  secondary: {
    main: COLOURS.PURPLE[500],
    dark: COLOURS.PURPLE[700],
    contrastText: COLOURS.WHITE,
  },
  info: {
    main: COLOURS.BLUE[500],
    dark: COLOURS.BLUE[800],
  },
  error: { main: COLOURS.RED },
  warning: { main: COLOURS.AMBER },
  success: { main: COLOURS.GREEN },
  background: COLOURS.BACKGROUND,
};

export default palette;
