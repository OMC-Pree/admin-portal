import { Components } from "@mui/material";
import MuiCssBaseline from "./baseline";
import buttons from "./buttons";
import tabs from "./tabs";
import accordian from "./accordian";
import inputs from "./inputs";
import cards from "./cards";
import tables from "./tables";

const components: Components = {
  MuiCssBaseline,
  ...buttons,
  ...tabs,
  ...accordian,
  ...inputs,
  ...cards,
  ...tables,
};

export default components;
