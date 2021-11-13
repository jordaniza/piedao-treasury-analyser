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
  return `${dateObj.getMonth()}/${dateObj.getDay()} ${dateObj.getHours()}:00`
};