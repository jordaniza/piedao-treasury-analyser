import { Total } from "../types/API";
import { computeTarget, daysBetweenTwoDates, formatDateHour } from "../utils";

export const generateLineTotals = (total: Total[]) => ({
  /**
   * @returns a list of treasury records with the percentage change, in the correct
   * format for the nivo line chart
   */
  id: "total",
  color: "hsl(292, 70%, 50%)",
  data: total.map(({ createdAt, treasury }) => ({
      x: formatDateHour(createdAt),
      y: treasury / 1_000_000
    })
  ),
});

export const generateLineTargets = (total: Total[], targetAPR: number) => {
  /**
   * @param targetAPI is used to calcualte the benchmark
   * @returns the target values for the treasury, at a given day, in a format ready
   * for the nivo line chart
   */
  const baseTreasuryValue = total[0]?.treasury ?? 1;
  return {
    id: "target",
    color: "hsl(100, 70%, 50%)",
    data: total.map(({ createdAt }) => {
      const days = daysBetweenTwoDates(total[0].createdAt, createdAt);
      const targetValue = computeTarget(baseTreasuryValue, targetAPR, days);
      return {
        x: formatDateHour(createdAt),
        y: targetValue / 1_000_000
      }
    })
  };
};
