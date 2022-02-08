import { IUser, UserRole } from "./user";

export type IdpErrors = string[];
export interface IdpStandardResponse {
  data: unknown[];
  errors: IdpErrors;
  meta: { [key: string]: unknown };
}

export type IdpErrorResponse = {
  status: number;
  data: IdpStandardResponse;
};

export type IdpRequestErrorListProps = {
  apiResponse: IdpErrorResponse;
};

export interface GetUsersRequest {
  id?: string;
  email?: string;
  type?: string;
  coachUserID?: string;
  managerUserID?: string;
  clientUserID?: string;
  planId?: string;
  airTableId?: string;
  associateUserId?: string;
  lastEvaluatedKey?: string;
  max?: number;
}

export interface GetUsersResponse extends IdpStandardResponse {
  data: IUser[];
  meta: {
    count: number;
    lastEvaluatedKey?: string;
  };
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
  data: Array<IUser>;
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
