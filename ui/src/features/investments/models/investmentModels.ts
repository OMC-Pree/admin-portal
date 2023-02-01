import { AllDataAnswerAggregation, GenericQuestion, GenericAnswer } from "../../aggregations/types";
import {
  INVESTMENT_ACCOUNT_PROVIDERS,
  INVESTMENT_ACCOUNT_TYPES_SHORT,
  PORTFOLIO_NAMES,
} from "../constants";
import { InvestmentActions } from "./investmentActionModels";

export type InvestmentAccountType =
  typeof INVESTMENT_ACCOUNT_TYPES_SHORT[keyof typeof INVESTMENT_ACCOUNT_TYPES_SHORT];

export type InvestmentAccountProvider =
  typeof INVESTMENT_ACCOUNT_PROVIDERS[keyof typeof INVESTMENT_ACCOUNT_PROVIDERS];

export type InvestmentDrawdown = { date: string; value: number; years: number };

export type ProtectableExpense = {
  type: "mortgage" | "childcare";
  endDate: string;
  monthlyValue: number;
};

export type AllGoals = {
  name: string;
  date: string;
  value: number | undefined;
  paymentType: "once" | "recurring";
};

export type Next5YearGoals = {
  name: string;
  date: string;
  totalCost: number;
  paymentType: "once" | "recurring";
};

export type InvestmentValuesData = {
  prevMonths: { date: string; value: number }[];
  currentTaxYear: { monthHeaders: string[]; values: number[] };
  nextTaxYear: { monthHeaders: string[]; values: number[] };
  currentYearRecommendations: {
    topup: number;
    initialAmount: number;
    monthlyRecommendation: number;
  };
  nextYearRecommendations: {
    topup: number;
    monthlyRecommendation: number;
  };
  isBeforeCutoffAndInMarch: boolean;
};

export type IncomeExpenseInvestable = {
  date: string;
  netIncome: number;
  expenses: number;
  investableAmount: number;
};

export type InvestmentForm = {
  // Plan data
  UK_INVESTMENT_ADVICE_ACTIVE_PLAN_ID_USED: string;
  UK_INVESTMENT_ADVICE_ACTIVE_PLAN_UPDATED_AT: string;
  UK_INVESTMENT_ADVICE_PLAN_CREATED_AT: string;

  // Personal finance information
  CLIENT_ANNUAL_GROSS_SALARY: number;
  CLIENT_ANNUAL_BONUS_COMMISSION_INCOME: number;
  CLIENT_ANNUAL_OTHER_INCOME_NET_OF_TAX: number;
  CLIENT_MONTHLY_PERSONAL_DC_PENSION_CONTRIBUTION: number;
  CLIENT_MONTHLY_EMPLOYER_DC_PENSION_CONTRIBUTION: number;
  PLAN_FORECAST_MONTHLY_TOTAL_EXPENSES: number;
  CLIENT_PLAN_TARGET_RETIREMENT_DATE: string;
  CLIENT_PLAN_TARGET_RETIREMENT_AGE: number;
  UK_INVESTMENT_ADVICE_FORECAST_WINDFALLS_ADVICE_PERIOD: number;
  UK_INVESTMENT_ADVICE_FORECAST_INCOME_EXPENSES_ADVICE_PERIOD: { data: IncomeExpenseInvestable[] };
  UK_INVESTMENT_ADVICE_FORECAST_PAST_INCOME_EXPENSES: { data: IncomeExpenseInvestable[] }; // start of plan until advice period

  // Emergency fund
  CLIENT_PLAN_EMERGENCY_FUND_TARGET_MONTHS: number;
  CLIENT_PLAN_EMERGENCY_FUND_TYPE: "net pay";
  CLIENT_PLAN_EMERGENCY_FUND_TARGET_VALUE: number;
  CLIENT_HAS_PLAN_TARGET_EMERGENCY_FUND: boolean | undefined;

  // Debt
  UK_INVESTMENT_ADVICE_FORECAST_TOTAL_DEBT_CREDIT_REPAYMENTS_ADVICE_PERIOD: number;
  CLIENT_HAS_NO_DEBTS: boolean | undefined;

  // Goals
  UK_INVESTMENT_ADVICE_GOALS_NEXT_5_YEARS: { data: Next5YearGoals[] };
  CLIENT_PLAN_ALL_GOALS: { data: AllGoals[] };
  PLAN_FORECAST_INVESTMENT_WITHDRAWALS: { data: InvestmentDrawdown[] };
  UK_INVESTMENT_ADVICE_GOALS_CLIENT_CONFIRMATION: boolean | undefined;

  // Protection
  PLAN_FORECAST_EXPENSES_THAT_REQUIRE_PROTECTION: { data: ProtectableExpense[] };
  UK_INVESTMENT_ADVICE_CLIENT_HAS_SUFFICIENT_PROTECTION: boolean | undefined;

  // Existing investments
  CLIENT_TOTAL_INVESTMENT_AMOUNT: number;
  UK_INVESTMENT_ADVICE_CLIENT_PAST_INVESTMENTS_NO_ADVICE_CONFIRMATION: boolean | undefined;

  // Pensions
  CLIENT_PLAN_YEARS_TO_RETIRE: number;
  PLAN_FORECAST_ANNUAL_RETIREMENT_INCOME: number;
  PLAN_FORECAST_STATE_PENSION_ANNUAL_INCOME: number;
  PLAN_FORECAST_DEFINED_BENEFIT_PENSION_ANNUAL_INCOME: number;
  PLAN_FORECAST_DEFINED_CONTRIBUTION_PENSION_TOTAL_AMOUNT: number;
  PLAN_FORECAST_DEFINED_CONTRIBUTION_PENSION_ANNUAL_INCOME: number;
  PLAN_FORECAST_CASH_INVESTMENTS_TOTAL_AMOUNT: number;
  PLAN_FORECAST_CASH_INVESTMENTS_ANNUAL_INCOME: number;
  PLAN_FORECAST_RETIREMENT_ESTIMATED_INCOME_TAX: number;
  PLAN_FORECAST_UNUSED_PENSION_ALLOWANCE: number;
  UK_INVESTMENT_ADVICE_CLIENT_MORE_PENSION_CONTRIBUTIONS_FUTURE_CONFIRMATION: boolean | undefined;

  // Recommended investment
  UK_INVESTMENT_ADVICE_CURRENT_TAX_YEAR_RECOMMENDED_INITIAL_INVESTMENT_VALUE: number;
  UK_INVESTMENT_ADVICE_CURRENT_TAX_YEAR_RECOMMENDED_MONTHLY_INVESTMENT_VALUE: number;
  UK_INVESTMENT_ADVICE_CURRENT_TAX_YEAR_RECOMMENDED_TOP_UP_INVESTMENT_VALUE: number;
  UK_INVESTMENT_ADVICE_NEXT_TAX_YEAR_RECOMMENDED_MONTHLY_INVESTMENT_VALUE: number;
  UK_INVESTMENT_ADVICE_NEXT_TAX_YEAR_RECOMMENDED_TOP_UP_INVESTMENT_VALUE: number;
  UK_INVESTMENT_ADVICE_START_DATE_SHIFTED_TO_NEXT_TAX_YEAR: boolean;
  UK_INVESTMENT_ADVICE_INITIAL_INVESTMENT_VALUE_CLIENT_CONFIRMED: number;
  UK_INVESTMENT_ADVICE_MONTHLY_INVESTMENT_VALUE_CLIENT_CONFIRMED: number;

  // Tax wrappers
  UK_INVESTMENT_ADVICE_VALUE_END_TAX_YEAR: number;
  UK_INVESTMENT_ADVICE_CLIENT_INVESTING_PURCHASE_1ST_PROPERTY: boolean | undefined;
  UK_INVESTMENT_ADVICE_CLIENT_USED_ISA_ALLOWANCE: boolean | undefined;
  UK_INVESTMENT_ADVICE_CLIENT_USED_ISA_ALLOWANCE_SS: number;
  UK_INVESTMENT_ADVICE_CLIENT_USED_ISA_ALLOWANCE_LISA: number;
  UK_INVESTMENT_ADVICE_CLIENT_USED_ISA_ALLOWANCE_CASH: number;

  //actions
  UK_INVESTMENT_ADVICE_INVESTMENT_ACTIONS: { data: InvestmentActions };

  // Recommended portfolio
  UK_RISK_TOLERANCE_LEVEL: number;
  UK_INVESTMENT_ADVICE_RECOMMENDED_PORTFOLIO: keyof typeof PORTFOLIO_NAMES;
  UK_INVESTMENT_ADVICE_PORTFOLIO_CLIENT_CONFIRMED: keyof typeof PORTFOLIO_NAMES;

  // Fund charges
  UK_INVESTMENT_ADVICE_FEES: {
    provider: "Parmenion";
    custody: number;
    advisor: number;
    fundOngoing: number;
    fundTrading: number;
    dfm: number;
    dealing: number;
    total: number;
  };

  // application submission
  UK_INVESTMENT_ADVICE_CLIENT_ACCEPTS_ADVICE_AND_FEES: boolean;
};

export type InvestmentKeyNames = keyof InvestmentForm;

export type InvestmentPensionAdviceForm = Pick<
  InvestmentForm,
  | "CLIENT_PLAN_YEARS_TO_RETIRE"
  | "PLAN_FORECAST_ANNUAL_RETIREMENT_INCOME"
  | "PLAN_FORECAST_STATE_PENSION_ANNUAL_INCOME"
  | "PLAN_FORECAST_DEFINED_BENEFIT_PENSION_ANNUAL_INCOME"
  | "PLAN_FORECAST_DEFINED_CONTRIBUTION_PENSION_TOTAL_AMOUNT"
  | "PLAN_FORECAST_DEFINED_CONTRIBUTION_PENSION_ANNUAL_INCOME"
  | "PLAN_FORECAST_CASH_INVESTMENTS_TOTAL_AMOUNT"
  | "PLAN_FORECAST_CASH_INVESTMENTS_ANNUAL_INCOME"
  | "PLAN_FORECAST_RETIREMENT_ESTIMATED_INCOME_TAX"
  | "PLAN_FORECAST_UNUSED_PENSION_ALLOWANCE"
  | "UK_INVESTMENT_ADVICE_CLIENT_MORE_PENSION_CONTRIBUTIONS_FUTURE_CONFIRMATION"
>;

export interface InvestmentAllDataAggregation extends AllDataAnswerAggregation {
  items: Record<
    InvestmentKeyNames,
    {
      question: GenericQuestion;
      answer: GenericAnswer;
    }
  >;
}
