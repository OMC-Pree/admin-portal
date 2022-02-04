import { Dispatch, SetStateAction } from "react";
import { SubmitHandler } from "react-hook-form";

export type UserRegistrationInfo = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type RegistrationFormInputs = UserRegistrationInfo & {
  confirmPassword: string;
};

export type RegistrationFormProps = {
  setUserInfo: Dispatch<SetStateAction<UserRegistrationInfo | undefined>>;
};

export type RegistrationFormOnSubmitHandler = SubmitHandler<RegistrationFormInputs>;

export type LoginFormInputs = {
  email: string;
  password: string;
};
export type LoginFormOnSubmitHandler = SubmitHandler<LoginFormInputs>;

export type ResetPasswordFormInputs = { email: string };
export type ResetPasswordOnSubmitHandler = SubmitHandler<ResetPasswordFormInputs>;
export type ResetPasswordFormProps = { onSuccess: Dispatch<SetStateAction<string>> };
export type ResetPasswordSuccessBoxProps = ResetPasswordFormInputs;

export type ChangePasswordFormInputs = {
  oldPassword: string;
  newPassword: string;
};
export type ChangePasswordOnSubmitHandler = SubmitHandler<ChangePasswordFormInputs>;
