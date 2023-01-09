import { UserJourneyStage, UserRole } from "./userEnums";

export const USER_ROLES = {
  CLIENT: UserRole.CLIENT,
  COACH: UserRole.COACH,
  MANAGER: UserRole.MANAGER,
};

export const journeyStageList = [
  {
    label: "Prospect",
    value: UserJourneyStage.PROSPECT,
  },
  {
    label: "Open Enquirer",
    value: UserJourneyStage.BOOKED_DISCOVERY,
  },
  {
    label: "Out of criteria pre-discovery",
    value: UserJourneyStage.OUT_OF_CRITERIA_PRE_DISCOVERY,
  },
  {
    label: "Discovery cancelled",
    value: UserJourneyStage.DISCOVERY_CANCELLED,
  },
  {
    label: "Out of criteria post-discovery",
    value: UserJourneyStage.OUT_OF_CRITERIA_POST_DISCOVERY,
  },
  {
    label: "Closed enquirer",
    value: UserJourneyStage.NOT_SIGNING_UP_POST_DISCOVERY,
  },
  {
    label: "Undecided post discovery",
    value: UserJourneyStage.UNDECIDED_POST_DISCOVERY,
  },
  {
    label: "Plan not shared",
    value: UserJourneyStage.INITIAL_FINDINGS_PENDING,
  },
  {
    label: "Plan shared",
    value: UserJourneyStage.INITIAL_FINDINGS_HELD,
  },
  {
    label: "Active Plan Set",
    value: UserJourneyStage.ACTIVE_PLAN_SET,
  },
  {
    label: "Suspended",
    value: UserJourneyStage.SUSPENDED,
  },
];
