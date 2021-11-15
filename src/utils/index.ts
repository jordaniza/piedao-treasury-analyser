export const dailyPerformanceTarget = (annualTarget: number): number => {
  /**
   * Computes a daily performance target based on the annual target.
   * We use the formula for continous compounding to calculate the daily rate.
   * 
   * @param annualTarget Annual target in whole percentage points
   * @returns Daily performance target in whole percentage points
   */
  const wholeNumberToPercent = (annualTarget / 100) + 1; // 1.XX
  const dailyTarget = wholeNumberToPercent ** (1 / 365); // 1.XX^(1/365)
  return (dailyTarget - 1) * 100; ;
}

export const numberWithCommas = (x: number | string) => {
  /**
   * Pretty formats a number with commas every 3 digits
   */
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
};

export const camelToSpaced = (str: string) => {
  /**
   * Converts a camel case string to a spaced string with capital letters
   * following each spaced word.
   */
  return str
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase());
};

export const calculateChange = (newVal: number, oldVal: number) => {
  return (newVal - oldVal) / oldVal;
}

export const formatDateHour = (date: string) => {
  /**
   * Line chart date formatting
   */
  const dateObj = new Date(date);
  return `${dateObj.getMonth()}/${dateObj.getDate()} ${dateObj.getHours()}:00`
};

export const daysBetweenTwoDates = (startDate: string, endDate: string): number => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export const computeTarget = (baseValue: number, targetPercentage: number, days: number): number => {
  /**
   * @returns the daily target value for a given base value, percentage, and
   * number of days
   */
  const increasePerDay = 1 + dailyPerformanceTarget(targetPercentage) / 100;
  return baseValue * Math.pow(increasePerDay, days);
}