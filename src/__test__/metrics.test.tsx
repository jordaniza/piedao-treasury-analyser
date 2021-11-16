import { dailyPerformanceTarget } from "./utils";

describe('Testing Financial calculations', () => {
  it('the daily performance target should calculate correcly' , () => {
    // https://www.calculatorsoup.com/calculators/financial/periodic-interest-rate-calculator.php
    const expectedDaily = 0.13699;
    const actual = dailyPerformanceTarget(50);
    expect(actual).toBe(expectedDaily);
  });
})