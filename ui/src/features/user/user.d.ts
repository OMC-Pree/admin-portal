export type UserPhoneNumber = {
  type: string;
  prefix: string;
  number: string;
};

export type UserAddress = {
  type?: string;
  entityName?: string;
  organisation?: string;
  street1?: string;
  street2?: string;
  street3?: string;
  street4?: string;
  subDivision1?: ECountries;
  city?: string;
  zipCode?: string;
  countryAlpha2?: string;
};

export type UserBankDetails = {
  type: "BBAN" | "IBAN" | "SWIFT";
  countryOfResidenceAlpha2: Country["alpha2"];
  bankName: string;
  accountHolderName: string;
  accountNumber: string;
  sortcode: string;
  iban?: string;
  swift?: string;
};

export interface INewUser {
  type: UserType;
  email: string;
  firstName: string;
  lastName: string;
  airTableId: string;
  dateOfBirth?: string;
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
  gender?: string;
  biologicalSex?: "Female" | "Male" | "";
  nationalityAlpha2?: Country["alpha2"] | null;
  countryOfBirthAlpha2?: Country["alpha2"] | null;
  nationalitiesIds?: UserNationalityId[] | null;
  usCitizen?: boolean;
  bankDetails?: UserBankDetails[];
}
