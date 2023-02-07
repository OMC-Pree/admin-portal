import { SetValueAs } from "../components/form/FormInputs";
import { roundToNDecimals } from "./numberUtils";

export const DEFAULT_INPUT_WIDTH = 150;

export const removeCommas = (value: string | number | boolean | Date | undefined) => {
  let cleanValue = value;
  if (typeof value === "string" && value.indexOf(",") > -1) {
    cleanValue = value.split(",").join("");
  }
  return cleanValue;
};

// In most setValueAs methods, the newValue is a string with some commas. The commas need to be removed for the number to be valid again
export const convertToNumber: SetValueAs = (previousValue, newValue) => {
  const value = Number(removeCommas(newValue));
  return isNaN(value) ? previousValue : value;
};

export const roundNumberInput: SetValueAs = (previousValue, newValue) => {
  const value = roundToNDecimals(Number(newValue), 0);
  return isNaN(value) ? previousValue : value;
};

export const maxCharactersInput = (maxLength: number): SetValueAs => {
  return (previousValue, newValue) => {
    const stringifiedNewValue = newValue?.toString();
    return stringifiedNewValue && stringifiedNewValue.length > maxLength ? previousValue : newValue;
  };
};

export const asNumber: SetValueAs = (previousValue, newValue) => {
  const value = roundToNDecimals(Number(newValue), 0);
  return isNaN(Number(newValue)) ? previousValue : Number(value);
};

export const isNullUndefinedOrEmpty = (value: string | boolean | null | undefined) => {
  return value === "" || value === undefined || value === null;
};
