export function numberFormatter(num: number, digits = 0, compact = false): string {
  return new Intl.NumberFormat(navigator.language, {
    minimumFractionDigits: digits,
    notation: compact ? "compact" : "standard",
  }).format(num);
}

export function currencyFormatter(num: number, digits = 2, compact = false): string {
  if (num >= 1_000_000 && compact === true) {
    return new Intl.NumberFormat(navigator.language, {
      style: "currency",
      currency: "GBP",
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
      notation: "compact",
    }).format(digits ? num : Math.floor(num));
  } else {
    return new Intl.NumberFormat(navigator.language, {
      style: "currency",
      currency: "GBP",
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
      notation: compact ? "compact" : "standard",
    }).format(digits ? num : Math.floor(num));
  }
}

export function percentFormatter(num: number, digits = 0): string {
  return new Intl.NumberFormat(navigator.language, {
    style: "percent",
    minimumFractionDigits: digits,
  }).format(num / 100);
}

export function formattedPercent(value: number): string {
  const num = Number(value.toFixed(3));
  const numSplit = num.toString().split(".");
  if (numSplit.length === 1) return percentFormatter(value);
  const afterDecimal = numSplit.pop();
  if (!afterDecimal || afterDecimal === ".") return percentFormatter(value);
  return percentFormatter(
    Number(`${numSplit[0]}.${afterDecimal}`),
    afterDecimal.length > 2 ? 2 : afterDecimal.length,
  );
}

export function roundToNDecimals(
  num: number,
  numDecimals = 2,
  roundingDirection?: "up" | "down",
): number {
  if (roundingDirection === "up") {
    return Math.ceil(num * 10 ** numDecimals) / 10 ** numDecimals;
  } else if (roundingDirection === "down") {
    return Math.floor(num * 10 ** numDecimals) / 10 ** numDecimals;
  } else {
    return +(Math.round(Number(num + `e+${numDecimals}`)) + `e-${numDecimals}`);
  }
}

export const MAX_SAFE_INTEGER = 9007199254740991;
