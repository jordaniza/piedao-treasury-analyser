import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { AssetEntity, TreasuryEntity, SetAction } from '../types/Treasury';
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table';
import { IconButton } from '@chakra-ui/button';
import { FaSearchPlus } from 'react-icons/fa';
import { Serie } from '@nivo/line';
import { Box } from '@chakra-ui/layout';
import { Stat, StatGroup, StatLabel, StatNumber } from '@chakra-ui/stat';
import { dailyPerformanceTarget, calculateChange, formatDateHour, numberWithCommas, camelToSpaced } from '../utils';
import { DisplayAsset, MonthPerf, PartMonth, Total } from '../types/API';

const totalsWithoutPercentageChange = (treasury: TreasuryEntity[]): Omit<Total, "percentageChange">[] => {
  return treasury
    .map(({ _id, treasury, createdAt }) => ({
      _id,
      treasury,
      createdAt,
      timestamp: new Date(createdAt).getTime()
    }))
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
};

const totalsWithPercentageChange = (partialTotals: Omit<Total, "percentageChange">[]): Total[] => {
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

const generatePieData = (total: TreasuryEntity) => total
  .underlying_assets
  .map(asset => ({
    id: asset.protocol,
    label: asset.protocol,
    value: asset.total,
    color: `hsl(${Math.round(Math.random() * 100)}, 70%, 50%)`
  })
);

const getFirstTotalInAsset = (assets: AssetEntity[], assetName: string): number => {
  /**
   * @param assets - array of underlying assets
   * @param assetName - protocol to search for
   * @returns total value locked in the asset
   */
  const asset = assets.find(({ protocol }) => protocol === assetName);
  return asset?.total ?? 0
}

const assetSplitByValue = (treasury: TreasuryEntity) => {
  /**
   * @returns the passed treasury record with the percentage split of
   * each asset added, according to total value.
   */
  return treasury.underlying_assets.map(asset => ({
    ...asset,
    percentage: asset.total / treasury.treasury
  }));
};

const generateAssetData = (selectedRecord: TreasuryEntity, baseAssets: AssetEntity[]) => {
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

const computeTotals = (treasury: TreasuryEntity[]): Total[] => {
  /**
   * @returns percentage change perfornace metrics for a given list
   * of treasury records
   */
  const partialTotals = totalsWithoutPercentageChange(treasury);
  return totalsWithPercentageChange(partialTotals);
};

const generateLineTotals = (total: Total[]) => ({
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

const generateLineTargets = (total: Total[], targetAPR: number) => {
  /**
   * @param targetAPI is used to calcualte the benchmark
   * @returns the target values for the treasury, at a given day, in a format ready
   * for the nivo line chart
   */
  const baseTreasuryValue = total[0]?.treasury ?? 1;
  const dailyPercentageTarget = 1 + (dailyPerformanceTarget(targetAPR)/100);
  const dailyTreasuryTarget = (baseTreasuryValue / 1_000_000) * dailyPercentageTarget;
  return {
    id: "target",
    color: "hsl(100, 70%, 50%)",
    data: total.map(({ createdAt }) => ({
        x: formatDateHour(createdAt),
        y: dailyTreasuryTarget * new Date(createdAt).getDay()
      })
    )
  }
};

const getSummaryStatistics = (filteredTotals: Total[], targetAPR: number) => {
  const earliest = filteredTotals[0].createdAt;
  const startPrice = filteredTotals[0].treasury;
  const latest = filteredTotals[filteredTotals.length - 1].createdAt;
  const latestPrice = filteredTotals[filteredTotals.length - 1].treasury;
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

const getFirstInMonth = (recordsByDay) => recordsByDay.filter((day, index) => {
  return index === 0 || day.month !== recordsByDay[index - 1].month;
});

const getLastInMonth = (recordsByDay) => recordsByDay.filter((day, index) => {
  return index === recordsByDay.length - 1
    || day.month !== recordsByDay[index + 1].month;
});

const removeDuplicateDays = (monthlyTotals) => monthlyTotals.filter((month, index) => {
  return index === 0 ? true : month.day !== monthlyTotals[index - 1].day;
});

const getTotalsByMonth = (filteredTotals): PartMonth[] => {
  const totalsByMonthAndDay = filteredTotals.map(total => ({
    month: new Date(total.createdAt).getMonth(),
    day: new Date(total.createdAt).getDay(),
    ...total,
  }));
  return totalsByMonthAndDay.reduce((acc: PartMonth[], curr: any) => {
    const month = new Date(curr.createdAt).getMonth();
    const day = new Date(curr.createdAt).getDay();
    const monthLabel = new Date(curr.createdAt).toLocaleString('default', { month: 'long' });
    const monthValue = curr.treasury;
    return [...acc, { month, day, monthLabel, monthValue }];
  }, []);
};

const generateMonthlySummary = (totalsByMonth: PartMonth[], targetAPR: number): Array<MonthPerf | undefined> => {
  const uniqueRecordsByDay = removeDuplicateDays(totalsByMonth);
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

const Api = ({ timeFrom, timeTo, setLineData, setPieData, targetAPR }:{
  timeFrom: number,
  timeTo: number | null,
  setLineData: SetAction<Serie[]>,
  setPieData: SetAction<any>,
  targetAPR: number;
}): JSX.Element => {
  const [treasury, setTreasury] = useState<TreasuryEntity[]>([]);
  const [totals, setTotals] = useState<Total[]>([]);
  const [asset, setAsset] = useState<DisplayAsset[]>([]);

  const generateLineData = (total: Total[]): void => {
    const lineData: Serie[] = [
      generateLineTotals(total),
      generateLineTargets(total, targetAPR)
    ];
    setLineData(lineData);
  };

  useEffect(() => {
    generateLineData(totals)
  }, [targetAPR]);

  useEffect(() => {
    axios.get('http://localhost:3000/treasury').then((res: AxiosResponse<TreasuryEntity[]>) => {
      setTreasury(res.data);
      if (treasury && treasury[0]?.underlying_assets) {
        setPieData(generatePieData(treasury[treasury.length - 1]));
      }
      const totals = computeTotals(res.data);
      setTotals(totals);
      generateLineData(totals);
    });
  }, []);

  const onClick = (id: string) => {
    const selectedRecord = treasury.find(({ _id }) => _id === id);
    if (selectedRecord) {
      const baseAssets = treasury[0].underlying_assets;
      const assetData = generateAssetData(selectedRecord, baseAssets);
      setAsset(assetData);
    }
  };

  let stats: any = {};
  let summary: any[] = [];

  const filteredTotals = totals.filter(({ timestamp }) => {
    const dateIsAfterFrom = (timestamp >= timeFrom); 
    const dateIsBeforeTo = (timestamp <= (timeTo ?? Infinity));
    return dateIsAfterFrom && dateIsBeforeTo;
  });

  if (filteredTotals[0]) {
    stats = getSummaryStatistics(filteredTotals, targetAPR);
    const monthlyTotals = getTotalsByMonth(filteredTotals);
    summary = generateMonthlySummary(monthlyTotals, targetAPR);
  }

  return (
    filteredTotals[0] ?
    <Box width="100%">
      <StatGroup>
        {
          Object.entries(stats).map((value: any[], index) => (
            <Stat
              key={index}
            >
              <StatLabel>{camelToSpaced(value[0])}</StatLabel>
              <StatNumber
                color={value[0] === "versusBenchmark" ? (Number(value[1].replace('%', '')) > 0 ? "green" : "red") : null}
              >{value[1]}</StatNumber>
            </Stat>
          ))
        }
      </StatGroup>
    <Box>
    <Table>
      <Thead>
        <Tr>
        {
          Object.keys(summary[0])
            .filter(key => key !== "month" && key !== "startValue" && key !== "endValue")
            .map(k => (<Th textAlign="center">{camelToSpaced(k)}</Th>))
        }
        </Tr>
      </Thead>
      <Tbody>
        {
          summary.map(s => (
            <Tr textAlign="center">
              <Td textAlign="center">{ s.days }</Td>
              <Td textAlign="center">{ s.monthLabel }</Td>
              <Td textAlign="center">{ Math.round(s.performance * 100) / 100 }%</Td>
              <Td textAlign="center">{ Math.round(s.versusTarget * 100) / 100 }%</Td>
            </Tr>
            )
          )
        }
      </Tbody>
    </Table>
    </Box>
    <Box>
    <Table>
      <Thead>
        <Tr>
        {
          Object.keys(filteredTotals[0])
            .concat("Get Underlying Assets")
            .filter(k => k !== "timestamp" && k !== "_id")
            .map(k => (<Th textAlign="center">{camelToSpaced(k)}</Th>))
        }
        </Tr>
      </Thead>
      <Tbody>
        {
          filteredTotals.map(
            ({ treasury, createdAt, percentageChange, _id }) => (
            <Tr textAlign="center">
              <Td textAlign="center">$ { numberWithCommas(Math.round(treasury)) }</Td>
              <Td textAlign="center">{ createdAt.slice(0, 16).replace("T", " ")}</Td>
              <Td textAlign="center" textColor={percentageChange > 0 ? "green" : "red"}>{ Math.round(percentageChange * 100_000) / 100_000 }%</Td>
              <Td textAlign="center"><IconButton aria-label="Search database" onClick={() => onClick(_id)} icon={<FaSearchPlus/>} /></Td>
            </Tr>
            )
          )
        }
      </Tbody>
    </Table>
    </Box>
      {
        asset.length > 0
        ?
          <Box>
          <Table>
              <Thead>
              <Tr>
              {
                Object.keys(asset[0])
                  .filter(k => k !== "assets" && k !== "debt")
                  .map(k => (<Th textAlign="center">{camelToSpaced(k)}</Th>))
              }
              </Tr>
            </Thead>
            <Tbody>
              {
                asset.map(
                  ({ network, protocol, total, percentage, initialValue, performance }) => (
                  <Tr textAlign="center">
                    <Td textAlign="center">{ network }</Td>
                    <Td textAlign="center">{ protocol }</Td>
                    <Td textAlign="center">$ { numberWithCommas(Math.round(total)) }</Td>
                    <Td textAlign="center">{ Math.round(percentage * 10_000) / 100 }%</Td>
                    <Td textAlign="center">$ { numberWithCommas(Math.round(initialValue)) }</Td>
                    <Td textAlign="center">{ Math.round(performance * 10_000) / 100 }%</Td>
                  </Tr>
                  )
                )
              }
            </Tbody>
          </Table>
        </Box>
       : <></>
      }
    </Box>
    : <></>
  )
}

export default Api
