export type CountryIdentifier = {
  name: string;
  example: string;
  priority: number;
  regex: string[];
};

export type Country = {
  alpha2: string;
  alpha3: string;
  name: string;
  golangRegBBAN: string;
  golangRegIBAN: string;
  golangRegSWIFT: string;
  identifiers: CountryIdentifier[];
};

export type CountryMapByCode = Record<Country["alpha2"], Country>;
