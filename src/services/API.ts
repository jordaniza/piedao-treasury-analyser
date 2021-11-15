import { MonthPerf, PartMonth, Total } from "../types/API";
import { PieData } from "../types/Chart";
import { AssetEntity, TreasuryEntity } from "../types/Treasury";
import { calculateChange, dailyPerformanceTarget, formatDateHour, numberWithCommas } from "../utils";

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
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
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

export const generatePieData = (total: TreasuryEntity): PieData[] => total
  .underlying_assets
  .map(asset => ({
    id: asset.protocol,
    label: asset.protocol,
    value: asset.total,
    color: `hsl(${Math.round(Math.random() * 100)}, 70%, 50%)`
  })
);

export const getFirstTotalInAsset = (assets: AssetEntity[], assetName: string): number => {
  /**
   * @param assets - array of underlying assets
   * @param assetName - protocol to search for
   * @returns total value locked in the asset
   */
  const asset = assets.find(({ protocol }) => protocol === assetName);
  return asset?.total ?? 0
}

export const assetSplitByValue = (treasury: TreasuryEntity) => {
  /**
   * @returns the passed treasury record with the percentage split of
   * each asset added, according to total value.
   */
  return treasury.underlying_assets.map(asset => ({
    ...asset,
    percentage: asset.total / treasury.treasury
  }));
};

export const generateAssetData = (selectedRecord: TreasuryEntity, baseAssets: AssetEntity[]) => {
  /**
   * split the assets by percentage of total value, then calculate the change in asset
   * values since the base period.
   */
  const assetWithPercentage = assetSplitByValue(selectedRecord);
  const sortedAssets = assetWithPercentage.sort((a, b) => b.total - a.total);
  return sortedAssets.map(asset => {
    const assetStartValue = getFirstTotalInAsset(baseAssets, asset.protocol);
    return {
      ...asset,
      initialValue: assetStartValue,
      performance: calculateChange(asset.total, assetStartValue)
    }
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

const computeTarget = (baseValue: number, targetPercentage: number, days: number): number => {
  /**
   * @returns the daily target value for a given base value, percentage, and
   * number of days
   */
  const increasePerDay = 1 + (targetPercentage / 100 / 365);
  return baseValue * Math.pow(increasePerDay, days);
}

const daysBetweenTwoDates = (startDate: string, endDate: string): number => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

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

export const getSummaryStatistics = (totals: Total[], targetAPR: number) => {
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
  return index === recordsByDay.length - 1
    || day.month !== recordsByDay[index + 1].month;
});

export const removeDuplicateDays = (monthlyTotals: PartMonth[]) => monthlyTotals.filter((month, index) => {
  return index === 0 ? true : month.day !== monthlyTotals[index - 1].day;
});

export const getTotalsByMonthAndDay = (totals: Total[]): PartMonth[] => {
  /**
   * Returns the total value for the treasury, with the month and day added.
   */
  return totals.map(total => ({
    month: new Date(total.createdAt).getMonth(),
    day: new Date(total.createdAt).getDay(),
    monthLabel: new Date(total.createdAt).toLocaleString('default', { month: 'long' }),
    monthValue: total.treasury,
  }));
};

export const generateMonthlySummary = (totalsByMonthAndDay: PartMonth[], targetAPR: number): Array<MonthPerf | undefined> => {
  /**
   * Gets the first and last daily record in each month.
   * @returns summary statistics and performance metrics for the month.
   */
  const uniqueRecordsByDay = removeDuplicateDays(totalsByMonthAndDay);
  const firstInMonth = getFirstInMonth(uniqueRecordsByDay);
  const lastInMonth = getLastInMonth(uniqueRecordsByDay);
  return firstInMonth.map((item: PartMonth, i: number) => {
    if (item.month === lastInMonth[i].month) {
      return {
        month: item.month,
        days: lastInMonth[i].day - item.day + 1,
        monthLabel: item.monthLabel,
        startValue: item.monthValue,
        endValue: lastInMonth[i].monthValue,
        performance: calculateChange(lastInMonth[i].monthValue, item.monthValue) * 100,
        versusTarget: (lastInMonth[i].day - item.day + 1) * dailyPerformanceTarget(targetAPR)
      }
    }
  })
};