export enum UserType {
  CLIENT = "client",
  COACH = "coach",
  MANAGER = "manager",
  APP_SERVICE = "appService",
}

export enum UserRole {
  APP_SERVICE = "APP_SERVICE",
  ADMIN = "ADMIN",
  MANAGER = "MANAGER",
  CLIENT = "CLIENT",
  COACH = "COACH",
}

export enum UserPermissions {
  UNSECURE_ROOT = "UNSECURE_ROOT",
  ADMIN = "ADMIN",
  MANAGER = "MANAGER",
  CLIENT = "CLIENT",
  COACH = "COACH",
}

export const USER_ROLES = {
  CLIENT: UserRole.CLIENT,
  COACH: UserRole.COACH,
  MANAGER: UserRole.MANAGER,
};

export type UserPhoneNumber = {
  type: string;
  prefix: string;
  number: string;
};

export type UserAddress = {
  type: string;
  entityName: string;
  organisation: string;
  street1: string;
  street2: string;
  street3: string;
  street4: string;
  city: string;
  zipCode: string;
  countryAlpha2: string;
};

export type UserMyAccountResponse = {
  data: IUser[];
};

export interface INewUser {
  type: UserType;
  managerUserID: string;
  coachUserID: string;
  clientUserID: string;
  permissions: string[];
  email: string;
  title: string;
  pronoun: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phones: UserPhoneNumber[];
  addresses: UserAddress[];
}

export interface IUser extends INewUser {
  id: string;
  airTableId: string;
  emailVerified: boolean;
  password: string;
  resetToken: string | null;
  resetTokenExpiry: string | null;
  planId: string;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}
