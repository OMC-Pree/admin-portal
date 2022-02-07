import type {} from "@mui/lab/themeAugmentation";
import { createTheme } from "@mui/material/styles";
import palette from "./palette";
import typography from "./typography";
import components from "./components";
import shape from "./shape";

const defaultTheme = createTheme({
  palette,
  shape,
  typography,
  components,
});

export default defaultTheme;
