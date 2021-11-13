export const dailyPerformanceTarget = (annualTarget: number): number => {
  const wholeNumberToPercent = (annualTarget / 100) + 1; // 1.XX
  const dailyTarget = wholeNumberToPercent ** (1 / 365); // 1.XX^(1/365)
  return (dailyTarget - 1) * 100; ;
}