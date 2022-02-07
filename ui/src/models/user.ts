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
  data: User[];
};

export type User = {
  id: string;
  type: UserType;
  managerUserID: string;
  coachUserID: string;
  clientUserID: string;
  planId: string;
  permissions: string[];
  email: string;
  emailVerified: boolean;
  password: string;
  resetToken: string | null;
  resetTokenExpiry: string | null;
  title: string;
  pronoun: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phones: UserPhoneNumber[];
  addresses: UserAddress[];
  metadata: Record<string, unknown>;
  createdAt: Record<string, unknown>;
  updatedAt: Record<string, unknown>;
};
