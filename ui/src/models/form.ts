import { RegisterOptions } from "react-hook-form";
import { FormInputType, SetValueAs } from "../components/form/FormInputs";

export interface FieldTemplate {
  label?: string;
  name: string;
  type: FormInputType;
  placeholder?: string;
  helperText?: string;
  helperTextPosition?: "top" | "bottom";
  rules?: RegisterOptions;
  options?: Array<{ label: string; value: string }>;
  prefix?: boolean | string | JSX.Element;
  suffix?: boolean | string | JSX.Element;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
  wrapLabel?: boolean;
  required?: boolean;
  width?: string | number;
}

export type FormInputValues = {
  [key: string]: string | number | Date | boolean;
};

export type FieldTemplateCreatorProps = {
  name?: string;
  label?: string;
  labelColor?: string;
  hoverLabelColor?: string;
  placeholder?: string;
  helperText?: string;
  helperTextColor?: string;
  helperTextPosition?: "top" | "bottom";
  helperTextSize?: number;
  backgroundColor?: string;
  prefix?: boolean | string | JSX.Element;
  onPrefixClick?: () => void;
  suffix?: boolean | string | JSX.Element;
  onSuffixClick?: () => void;
  rules?: RegisterOptions;
  required?: boolean;
  requiredMessage?: string;
  minLength?: number;
  maxLength?: number;
  shouldValidate?: boolean;
  shouldUnregister?: boolean;
  options?: Array<{ label: string; value: string }>;
  disabled?: boolean;
  wrapLabel?: boolean;
  width?: string | number;
  fullWidth?: boolean;
  showInnerBorder?: boolean;
  setValueAs?: SetValueAs;
};

export type TextFieldTemplateCreatorProps = FieldTemplateCreatorProps & {
  name: string;
};

export type NumberFieldTemplateCreatorProps = TextFieldTemplateCreatorProps & {
  valueAsNumber?: boolean;
  min?: number;
  max?: number;
  minMessage?: string;
  maxMessage?: string;
  numberOfDecimalPlaces?: 1 | 2;
  notZero?: boolean;
};

export type DateFieldTemplateCreatorProps = TextFieldTemplateCreatorProps & {
  valueAsDate?: boolean;
  minDate?: Date;
  maxDate?: Date;
  validationMessage?: string;
  allowEmpty?: boolean;
};

export type DateFieldCustomValidators = {
  dateIsAfter?: (v: string | Date) => boolean | string;
  dateIsBefore?: (v: string | Date) => boolean | string;
  isValidDate: (v: string | Date | undefined) => boolean | string;
};

export type SelectFieldTemplateCreatorProps = TextFieldTemplateCreatorProps & {
  options?: Array<{ label: string; value: string }>;
};
