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

export interface INewUser {
  type: UserType;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  airTableId: string;
  managerUserId?: string;
  coachUserId?: string;
  clientUserId?: string;
  associateUserId?: string;
  title?: string;
  pronoun?: string;
  phones?: UserPhoneNumber[];
  addresses?: UserAddress[];
}

export interface IUser extends INewUser {
  id: string;
  emailVerified: boolean;
  password: string;
  permissions: UserPermissions[];
  resetToken: string | null;
  resetTokenExpiry: string | null;
  planId: string;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}
