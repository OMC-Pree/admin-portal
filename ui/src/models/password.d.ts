import { MutableRefObject } from "react";
import { SubmitHandler } from "react-hook-form";

export type PasswordCriteriaOption = { name: string; matcher: RegExp; text: string };
export type PasswordCriteriaProps = { password: MutableRefObject | string };

export type RecoverPasswordFormProps = { onSuccess: () => void };
export type RecoverPasswordDefaultValues = { password: string; confirmPassword: string };
export type RecoverPasswordSubmitHandler = SubmitHandler<RecoverPasswordDefaultValues>;
