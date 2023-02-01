import { InvestmentAccountProvider, InvestmentAccountType } from "./investmentModels";

export type InvestmentAction = {
  startDate: string;
  endDate: string;
  oneOffValue: number;
  monthlyValue: number;
  account: InvestmentAccountType;
  provider: InvestmentAccountProvider;
};
export type InvestmentActions = InvestmentAction[];

export type InvestmentActionsByYear = Record<"thisTaxYear" | "nextTaxYear", InvestmentAction[]>;
