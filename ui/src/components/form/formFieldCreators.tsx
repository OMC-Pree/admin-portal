import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { format, isAfter, isBefore, subDays } from "date-fns";
import { RegisterOptions } from "react-hook-form";
import {
  DateFieldCustomValidators,
  DateFieldTemplateCreatorProps,
  FieldTemplate,
  FieldTemplateCreatorProps,
  NumberFieldTemplateCreatorProps,
  SelectFieldTemplateCreatorProps,
  TextFieldTemplateCreatorProps,
} from "../../models/form";
import { DEFAULT_INPUT_WIDTH } from "../../utils/formUtils";
import {
  EMAIL_VALIDATION_REGEX,
  generateNumberRegexWithXDecimalPlaces,
  HAS_DIGIT_REGEX,
  HAS_UPPERCASE_REGEX,
  IS_NUMBER_REGEX,
  PASSWORD_VALIDATION_REGEX,
} from "../../utils/inputValidationRegex";
import { MAX_SAFE_INTEGER } from "../../utils/numberUtils";

const defaultPlaceholder = "Enter here";

export const createTextFieldTemplate = ({
  label,
  name,
  placeholder = defaultPlaceholder,
  requiredMessage = "",
  minLength = 0,
  maxLength = MAX_SAFE_INTEGER,
  disabled,
  width = DEFAULT_INPUT_WIDTH,
  required = false,
  rules = {},
  ...rest
}: TextFieldTemplateCreatorProps): FieldTemplate => ({
  label,
  name,
  width,
  placeholder,
  disabled,
  type: "text",
  rules: {
    required: rules.required || { message: requiredMessage, value: required },
    minLength: {
      value: minLength,
      message: `Must be more than ${minLength} characters long`,
    },
    maxLength: {
      value: maxLength,
      message: `Must be less than ${maxLength} characters long`,
    },
    ...rules,
  },
  ...rest,
});

export const createNumberFieldTemplate = ({
  placeholder = defaultPlaceholder,
  requiredMessage = "",
  valueAsNumber,
  min = 0,
  max,
  minMessage,
  maxMessage,
  required = false,
  width = DEFAULT_INPUT_WIDTH,
  numberOfDecimalPlaces,
  notZero,
  ...rest
}: NumberFieldTemplateCreatorProps): FieldTemplate => ({
  placeholder,
  width,
  type: "number",
  rules: {
    valueAsNumber,
    required: { message: requiredMessage, value: required },
    pattern: {
      value: IS_NUMBER_REGEX,
      message: "Must be a number",
    },
    min: {
      value: String(min),
      message: minMessage ?? "",
    },
    max: max
      ? {
          value: String(max),
          message: maxMessage ?? "",
        }
      : undefined,
    validate: {
      ...(numberOfDecimalPlaces
        ? {
            numberOfDecimalPlaces: (v: string) => {
              const regex = generateNumberRegexWithXDecimalPlaces(numberOfDecimalPlaces);
              return regex.test(v) || `Requires ${numberOfDecimalPlaces} or less decimal places`;
            },
          }
        : {}),
      ...(notZero
        ? {
            notZero: (value: number) => {
              return value > 0 ? true : "Has to be greater than 0";
            },
          }
        : {}),
    },
  },
  ...rest,
});

export const createEmailFieldTemplate = ({
  label = "Email address",
  name = "email",
  placeholder = defaultPlaceholder,
  prefix = <EnvelopeIcon style={{ width: 20 }} />,
  requiredMessage = "Please enter your email",
  disabled,
  ...rest
}: FieldTemplateCreatorProps = {}): FieldTemplate => ({
  label,
  name,
  placeholder,
  prefix,
  disabled,
  type: "email",
  rules: {
    required: requiredMessage,
    validate: {
      email: (value) => EMAIL_VALIDATION_REGEX.test(value) || "Enter a valid email address",
    },
  },
  ...rest,
});

export const createPasswordFieldTemplate = ({
  label = "Password",
  name = "password",
  placeholder = defaultPlaceholder,
  prefix = <LockClosedIcon style={{ width: 20 }} />,
  requiredMessage = "",
  minLength = 8,
  shouldValidate = true,
  ...rest
}: FieldTemplateCreatorProps = {}): FieldTemplate => {
  let validate;
  if (shouldValidate) {
    validate = {
      hasDigit: (value: string) => HAS_DIGIT_REGEX.test(value),
      hasUc: (value: string) => HAS_UPPERCASE_REGEX.test(value),
      hasSymbol: (value: string) => PASSWORD_VALIDATION_REGEX.test(value),
    };
  }
  return {
    label,
    name,
    placeholder,
    prefix,
    type: "password",
    rules: {
      required: requiredMessage,
      minLength: shouldValidate ? minLength : 0,
      validate,
    },
    ...rest,
  };
};

export const createTwoFAFieldTemplate = ({
  label = "",
  name = "email2FACode",
  placeholder = defaultPlaceholder,
  requiredMessage = "",
  ...rest
}: FieldTemplateCreatorProps = {}): FieldTemplate => {
  return {
    width: 140,
    label,
    name,
    placeholder,
    type: "text",
    rules: {
      required: requiredMessage,
    },
    ...rest,
  };
};

export const createConfirmPasswordFieldTemplate = ({
  label = "Confirm password",
  name = "confirmPassword",
  placeholder = defaultPlaceholder,
  prefix = <LockClosedIcon style={{ width: 20 }} />,
  required = true,
  requiredMessage = "Re-enter password",
  ...rest
}: FieldTemplateCreatorProps = {}): FieldTemplate & { rules: RegisterOptions } => ({
  label,
  name,
  placeholder,
  prefix,
  type: "password",
  rules: {
    required: { message: requiredMessage, value: required },
  },
  ...rest,
});

export const createSelectFieldTemplate = (
  { label, name, requiredMessage = "", options = [] }: SelectFieldTemplateCreatorProps = {
    label: "",
    name: "",
  },
): FieldTemplate => ({
  label,
  name,
  options,
  type: "select",
  rules: { required: requiredMessage },
});

export const createDateFieldTemplate = ({
  name = "date",
  prefix = true,
  required = false,
  requiredMessage = "",
  valueAsDate = true,
  minDate,
  maxDate,
  validationMessage,
  allowEmpty = false,
  width = DEFAULT_INPUT_WIDTH,
  ...rest
}: DateFieldTemplateCreatorProps): FieldTemplate => {
  const isValidEmpty = (v: Date | string | undefined) => allowEmpty && (!v || v === "");

  const isDateString = (str: string) => !isNaN(Date.parse(str)) || "Please enter a valid date";

  const validate: DateFieldCustomValidators = {
    isValidDate: (v) =>
      (v instanceof Date && !isNaN(v.getTime())) ||
      isDateString(String(v)) ||
      isValidEmpty(v) ||
      "Bad Date",
  };

  if (minDate)
    validate.dateIsAfter = (v) =>
      (isAfter(v instanceof Date ? v : new Date(v), minDate) &&
        (isDateString(String(v)) || isValidEmpty(v))) ||
      (validationMessage ? validationMessage : `Date must be after ${format(minDate, "dd-MM-yy")}`);

  if (maxDate)
    validate.dateIsBefore = (v) =>
      (isBefore(subDays(v instanceof Date ? v : new Date(v), 1), maxDate) &&
        (isDateString(String(v)) || isValidEmpty(v))) ||
      (validationMessage
        ? validationMessage
        : `Date must be before ${format(maxDate, "dd-MM-yy")}`);

  return {
    name,
    ...rest,
    type: "date",
    prefix,
    minDate,
    maxDate,
    width,
    required,
    rules: {
      required: { value: required, message: requiredMessage },
      valueAsDate,
      validate,
    },
  };
};
