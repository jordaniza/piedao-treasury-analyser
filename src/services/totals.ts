import { Total } from "../types/API";
import { TreasuryEntity } from "../types/Treasury";
import { calculateChange } from "../utils";

export const totalsWithoutPercentageChange = (treasury: TreasuryEntity[]): Omit<Total, "percentageChange">[] => {
  /**
   * Converts the passed array of treasury objects into a reduced summarised form
   * While adding a timestamp and sorting by recency.
   */
  return treasury
    .map(({ _id, treasury, createdAt }) => ({
      _id,
      treasury,
      createdAt,
      timestamp: new Date(createdAt).getTime()
    }))
    .sort((a, b) => a.timestamp - b.timestamp);
};

export const totalsWithPercentageChange = (partialTotals: Omit<Total, "percentageChange">[]): Total[] => {
  /**
   * Takes the summary totals (which have been sorted) and runs the percentage change
   * formula, before returning the new array.
   */
  return partialTotals.map((total, idx) => {
    if (idx === 0) {
      return { ...total, percentageChange: 0 };
    }
    const previousTotal = partialTotals[idx - 1].treasury;
    const percentageChange = calculateChange(total.treasury, previousTotal);
    return {
      ...total,
      percentageChange,
    };
  });
};

export const computeTotals = (treasury: TreasuryEntity[]): Total[] => {
  /**
   * @returns percentage change perfornace metrics for a given list
   * of treasury records
   */
  const partialTotals = totalsWithoutPercentageChange(treasury);
  return totalsWithPercentageChange(partialTotals);
};