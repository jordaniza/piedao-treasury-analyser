import { MonthlySummary, PartMonth, HeadlineStats, Total } from "../types/API";
import { calculateChange, dailyPerformanceTarget, numberWithCommas } from "../utils";


export const getStats = (totals: Total[], targetAPR: number): HeadlineStats => {
  /**
   * @returns the headline stats for the DAO's treasury, over the given time period
   * Taking into account the target percentage return over the year.
   */
  const earliest = totals[0].createdAt;
  const startPrice = totals[0].treasury;
  const latest = totals[totals.length - 1].createdAt;
  const latestPrice = totals[totals.length - 1].treasury;
  const days = Math.ceil(new Date(latest).getDate() - new Date(earliest).getDate()) + 1;
  const change = ((latestPrice - startPrice) / startPrice) * 100;
  const target = dailyPerformanceTarget(targetAPR) * days;
  return {
    earliest: earliest.slice(0, 10),
    latest: latest.slice(0, 10),
    days, 
    startPrice: `$ ${numberWithCommas(startPrice.toFixed(0))}`,
    latestPrice: `$ ${numberWithCommas(latestPrice.toFixed(0))}`,
    actual: `${change.toFixed(2)}%`,
    targetForPeriod: `${target.toFixed(2)}%`,
    versusBenchmark: `${(change - target).toFixed(2)}%`,
  };
};

export const getFirstInMonth = (recordsByDay: PartMonth[]) => recordsByDay.filter((day, index) => {
  return index === 0 || day.month !== recordsByDay[index - 1].month;
});

export const getLastInMonth = (recordsByDay: PartMonth[]) => recordsByDay.filter((day, index) => {
  return index === recordsByDay.length - 1 || day.month !== recordsByDay[index + 1].month;
});

export const getTotalsByMonthAndDay = (totals: Total[]): PartMonth[] => {
  /**
   * Returns the total value for the treasury, with the month and day added.
   */
  return totals
    .map(total => ({
      month: new Date(total.createdAt).getMonth(),
      day: new Date(total.createdAt).getDate(),
      monthLabel: new Date(total.createdAt).toLocaleString('default', { month: 'long' }),
      monthValue: total.treasury,
    }))
    .sort((a, b) => a.month - b.month || a.day - b.day);
};

export const generateMonthlySummary = (totalsByMonthAndDay: PartMonth[], targetAPR: number): Array<MonthlySummary> => {
  /**
   * Using only the first and last days found in each month:
   * @returns summary statistics and performance metrics for the month.
   */
  const firstInMonth = getFirstInMonth(totalsByMonthAndDay);
  const lastInMonth = getLastInMonth(totalsByMonthAndDay);
  return firstInMonth
  .filter((item: PartMonth, i: number) => item.month === lastInMonth[i].month)
  .map((item: PartMonth, i: number) => {
    const daysInMonth = lastInMonth[i].day - (item.day) + 1;
    return {  month: item.month,
      days: daysInMonth,
      monthLabel: item.monthLabel,
      startValue: item.monthValue,
      endValue: lastInMonth[i].monthValue,
      performance: calculateChange(lastInMonth[i].monthValue, item.monthValue) * 100,
      target: daysInMonth * dailyPerformanceTarget(targetAPR)
    }
  });
};