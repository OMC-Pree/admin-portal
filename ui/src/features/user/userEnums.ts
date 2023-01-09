export enum UserType {
  CLIENT = "client",
  COACH = "coach",
  MANAGER = "manager",
  APP_SERVICE = "appService",
  ENQUIRER = "enquirer",
}

export enum UserRole {
  APP_SERVICE = "APP_SERVICE",
  ADMIN = "ADMIN",
  MANAGER = "MANAGER",
  CLIENT = "CLIENT",
  COACH = "COACH",
}

export enum UserPermissions {
  ADMIN = "ADMIN",
  MANAGER = "MANAGER",
  CLIENT = "CLIENT",
  COACH = "COACH",
  ENQUIRER = "ENQUIRER",
  BLOCKED = "BLOCKED",
}

export enum UserJourneyStage {
  PROSPECT = "PROSPECT",
  BOOKED_DISCOVERY = "BOOKED_DISCOVERY",
  OUT_OF_CRITERIA_PRE_DISCOVERY = "OUT_OF_CRITERIA_PRE_DISCOVERY",
  DISCOVERY_CANCELLED = "DISCOVERY_CANCELLED",
  OUT_OF_CRITERIA_POST_DISCOVERY = "OUT_OF_CRITERIA_POST_DISCOVERY",
  NOT_SIGNING_UP_POST_DISCOVERY = "NOT_SIGNING_UP_POST_DISCOVERY",
  UNDECIDED_POST_DISCOVERY = "UNDECIDED_POST_DISCOVERY",
  INITIAL_FINDINGS_PENDING = "INITIAL_FINDINGS_PENDING",
  INITIAL_FINDINGS_HELD = "INITIAL_FINDINGS_HELD",
  ACTIVE_PLAN_SET = "ACTIVE_PLAN_SET",
  SUSPENDED = "SUSPENDED",
}
