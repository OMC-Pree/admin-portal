import { PORTFOLIO_NAMES } from "../constants";

export type Distribution = { shares: number; bonds: number };
type FundType = "Shares" | "Bonds";
type Fund = {
  name: string;
  type: FundType;
  sedol: string;
  weight: number;
  portfolioWeight: Record<number, number>;
};

type FundReturns = {
  img: string;
};

type FundPerformance = {
  img: string;
  values: {
    perc1: number;
    year1: number;
    value1: number;
    perc2: number;
    year2: number;
    value2: number;
  };
};

export type ChargeComposition = {
  name: string;
  value: number;
  description: string;
};

export type FundChargeName =
  | "custody"
  | "advisor"
  | "fundOngoing"
  | "fundTrading"
  | "dfm"
  | "dealing";

type FundPrice = {
  total: number;
  composition: Record<FundChargeName, ChargeComposition>;
};

export type AssetFundGroup = {
  type: FundType | "Mixed";
  name: string;
  weight: Record<number, number>;
  funds: Fund[];
};

export type Portfolio = {
  name: keyof typeof PORTFOLIO_NAMES;
  provider: "Parmenion";
  factsheetURL: string;
  distribution: Distribution;
  performance: FundPerformance;
  returns: FundReturns;
  charges: FundPrice;
};

export type PortfolioMap = Record<number, Portfolio>;
