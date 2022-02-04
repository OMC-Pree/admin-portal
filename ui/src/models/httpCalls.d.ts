import { User, UserRole } from "./user";

export type IdpErrors = string[];
export interface IdpStandardResponse {
  data: unknown[];
  errors: IdpErrors;
  meta: unknown;
}

export type IdpErrorResponse = {
  status: number;
  data: IdpStandardResponse;
};

export type IdpRequestErrorListProps = {
  apiResponse: IdpErrorResponse;
};

export interface GetUsersResponse extends IdpStandardResponse {
  data: User[];
}
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  type: string;
  expiryIn: number;
  expiry: string;
  encryptedJWTToken: string;
}

export type RegisterUserRequest = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  title?: string;
  pronoun?: string;
  dateOfBirth?: string;
  managerUserID?: string;
  coachUserID?: string;
  clientUserID?: string;
};

export type RegisterUserResponse = {
  data: Array<User>;
  meta: Record<string, unknown>;
  errors: string[];
};

export interface TokenDecryptResponse {
  exp: number;
  iat: number;
  iss: string;
  identityUser: {
    id: string;
    permissions: UserRole;
  };
}

export type VerifyEmailRequest = { token: string };

export interface ForgotPasswordRequest {
  email: string;
}

export interface RecoverPasswordRequest {
  newPassword: string | null;
  resetToken: string | null;
}

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}
