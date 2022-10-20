import { INewUser } from "../features/user/user";
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

export interface StandardUsersResponse extends IdpStandardResponse {
  data: IUser[];
}

export interface GetUsersRequest {
  id?: string;
  email?: string;
  type?: string;
  coachUserId?: string;
  managerUserId?: string;
  clientUserId?: string;
  planId?: string;
  airTableId?: string;
  associateUserId?: string;
  lastEvaluatedKey?: string;
  max?: number;
}

export interface GetUsersResponse extends StandardUsersResponse {
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
  tokenType: string;
  tokenExpiryIn: number;
  tokenExpiry: string;
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
  managerUserId?: string;
  coachUserId?: string;
  clientUserId?: string;
};

export type RegisterUserResponse = {
  data: Array<IUser>;
  meta: Record<string, unknown>;
  errors: string[];
};

export interface IDPNewUser extends INewUser {
  onCreateSendEmailHQToCoach: boolean;
  onCreateSendEmailHQToClient: boolean;
  onCreateSendEmailCoachToClient: boolean;
}

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

export type UpdateUserAccessRequest = Partial<
  Pick<
    IUser,
    | "id"
    | "type"
    | "permissions"
    | "managerUserId"
    | "coachUserId"
    | "clientUserId"
    | "associateUserId"
    | "organisationIdentityId"
  >
>;
