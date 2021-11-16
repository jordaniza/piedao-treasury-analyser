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
  /**
   * This calculates the whole days that have passed between two dates.
   * Does not include time differentials comprising a partial day, eg:
   * 6pm Tuesday to 7pm Wednesday is 1 day, NOT 2 days.
   */
  const start = dateToDays(startDate);
  const end = dateToDays(endDate);
  console.log(start, end);
  return end - start;
}

export const dateToDays = (date: string): number => {
  /**
   * Each new day, the target percentage is increased, so we
   * @returns how many whole days have passed since the passed date
   */
  const dateObj = new Date(date);
  const time = dateObj.getTime();
  const timeToDays = time / (1000 * 60 * 60 * 24);
  return Math.floor(timeToDays);
}

export const periodTargetIncrease = (targetPercentage: number, days: number): number => {
  const increasePerDay = 1 + dailyPerformanceTarget(targetPercentage) / 100;
  return Math.pow(increasePerDay, days)
}

export const computeTarget = (baseValue: number, targetPercentage: number, days: number): number => {
  /**
   * @returns the daily target value for a given base value, percentage, and
   * number of days
   */
  return baseValue * periodTargetIncrease(targetPercentage, days);
}