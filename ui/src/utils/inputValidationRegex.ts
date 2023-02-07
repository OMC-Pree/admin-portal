export const PASSWORD_VALIDATION_REGEX = /[!"#$%&'()*+,-./:;<=>?@^_{|}~[\]\\]/;

export const EMAIL_VALIDATION_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export const IS_NUMBER_REGEX = /^-?(0|[1-9]\d*)(\.\d+)?$/;

export const HAS_DIGIT_REGEX = /\d/;

export const HAS_UPPERCASE_REGEX = /[A-Z]/;

export const generateNumberRegexWithXDecimalPlaces = (decimalPlaces: number): RegExp => {
  return new RegExp(`^-?(0|[1-9]\\d*)(\\.\\d{1,${decimalPlaces}})?$`);
};
