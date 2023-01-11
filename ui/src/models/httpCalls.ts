import { UserRole } from "../features/user/userEnums";
import { INewUser, IUser } from "../features/user/userModels";

export type IdpErrors = string[];
export interface OmcApiStandardResponse {
  data: unknown[];
  errors: IdpErrors;
  meta: { [key: string]: unknown };
}

export type IdpErrorResponse = {
  status: number;
  data: OmcApiStandardResponse;
};

export type IdpRequestErrorListProps = {
  apiResponse: IdpErrorResponse;
};

export interface StandardUsersResponse extends OmcApiStandardResponse {
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

export type UpdateUserRequest = Pick<IUser, "id"> &
  Partial<
    Omit<
      IUser,
      | "type"
      | "permissions"
      | "managerUserId"
      | "coachUserId"
      | "clientUserId"
      | "associateUserId"
      | "organisationIdentityId"
    >
  >;

export type UpdateUserAccessRequest = Pick<IUser, "id"> &
  Partial<
    Pick<
      IUser,
      | "type"
      | "permissions"
      | "managerUserId"
      | "coachUserId"
      | "clientUserId"
      | "associateUserId"
      | "organisationIdentityId"
      | "journeyStage"
    >
  >;
