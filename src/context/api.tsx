import React, { useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { AssetEntity, TreasuryEntity } from '../types/Treasury';
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table';
import { IconButton } from '@chakra-ui/button';
import { FaSearchPlus } from 'react-icons/fa';
import { Serie } from '@nivo/line';
  import { Box } from '@chakra-ui/layout';
import { Stat, StatGroup, StatLabel, StatNumber } from '@chakra-ui/stat';
import { dailyPerformanceTarget } from '../utils';

const numberWithCommas = (x: number | string) => x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

interface Total extends Pick<TreasuryEntity, "_id" | "treasury" | "createdAt"> {
  percentageChange: number;
  timestamp: number;
}

interface DisplayAsset extends AssetEntity {
  percentage: number;
  initialValue: number;
  performance: number;
}

const Api = ({ timeFrom, timeTo, setLineData, setPieData, targetAPR }:{
  timeFrom: number,
  timeTo: number | null,
  setLineData: React.Dispatch<React.SetStateAction<Serie[]>>,
  setPieData: React.Dispatch<React.SetStateAction<any>>,
  targetAPR: number;
}): JSX.Element => {
  const [treasury, setTreasury] = React.useState<TreasuryEntity[]>([]);
  const [totals, setTotals] = React.useState<Total[]>([]);
  const [asset, setAsset] = React.useState<DisplayAsset[]>([]);

  useEffect(() => {
    generateLineData(totals)
  }, [targetAPR]);
  useEffect(() => {
    axios.get('http://localhost:3000/treasury').then((res: AxiosResponse<TreasuryEntity[]>) => {
      
      setTreasury(res.data);
      if (treasury && treasury[0]?.underlying_assets) setPieData(generatePieData(treasury[treasury.length - 1]));
      
      const partialTotals: Omit<Total, "percentageChange">[] = res.data
        .map(({ _id, treasury, createdAt }) => ({
            _id,
            treasury,
            createdAt,
            timestamp: new Date(createdAt).getTime()
          })
        )
        .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      
      const totals: Total[] = partialTotals.map((total, idx) => {
          if (idx === 0) {
            return { ...total, percentageChange: 0 };
          }
          const percentageChange = (total.treasury - partialTotals[idx - 1].treasury) / partialTotals[idx - 1].treasury;
          return {
            ...total,
            percentageChange,
          };
        });
      
      // let prevCumulativeChange = 0;
      
      // const totals: Total[] = nonCumulativeTotals.map((total, index) => {
      //   if (index === 0) {
      //     return {
      //       ...total,
      //       cumulativeChange: 0,
      //     }
      //   } else {
      //     const cumulativeChange = prevCumulativeChange + total.percentageChange;
      //     prevCumulativeChange = cumulativeChange;
      //     return {
      //       ...total,
      //       cumulativeChange
      //     };
      //   };
      // });

      setTotals(totals);
      generateLineData(totals);
    });
  }, []);

  const generatePieData = (total: TreasuryEntity) => total
    .underlying_assets
    .map(asset => ({
      id: asset.protocol,
      label: asset.protocol,
      value: asset.total,
      color: `hsl(${Math.round(Math.random() * 100)}, 70%, 50%)`
    })
  )

  const onClick = (id: string) => {
    const selectedRecord = treasury.find(({ _id }) => _id === id);
    if (selectedRecord) {

      const selectedAssets = selectedRecord.underlying_assets
      const sortedAssets = selectedAssets.sort((a, b) => b.total - a.total);
      const assetWithPercentage = sortedAssets.map(asset => ({
        ...asset, percentage: asset.total / selectedRecord.treasury }));
      const assetZero = treasury[0].underlying_assets;
      const assetWithStartValue = assetWithPercentage.map(asset => {
        const startValue = assetZero.find(({ protocol }) => protocol === asset.protocol)?.total ?? 0;
        return {
          ...asset,
          initialValue: startValue,
          performance: (asset.total - startValue) / startValue
        }
      });
      setAsset(assetWithStartValue);
    }
  };

  const camelToSpaced = (str: string) => str.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());

  const generateLineData = (total: Total[]): void => {
    const baseTreasuryValue = total[0]?.treasury ?? 1;
    console.debug({ target: dailyPerformanceTarget(targetAPR)})
    const lineData: Serie[] = [
      {
        id: "total",
        color: "hsl(292, 70%, 50%)",
        data: total.map(({ createdAt, treasury }) => ({
            x: `${
              new Date(createdAt).getMonth()
            }/${
              new Date(createdAt).getDay()
            } ${
              new Date(createdAt).getHours()
            }:00`,
            y: treasury / 1_000_000
          })
        ),
      },
      {
        id: "target",
        color: "hsl(100, 70%, 50%)",
        data: total.map(({ createdAt }) => ({
            x: `${
              new Date(createdAt).getMonth()
            }/${
              new Date(createdAt).getDay()
            } ${
              new Date(createdAt).getHours()
            }:00`,
            y: (baseTreasuryValue / 1_000_000) * (1 + (dailyPerformanceTarget(targetAPR)/100) * (new Date(createdAt).getDay()))
          })
        )
      }
    ];
    setLineData(lineData);
  };

  let stats: any = {};
  let summary: any[] = [];

  const filteredTotals = totals.filter(({ timestamp }) => (timestamp >= timeFrom) && (timestamp <= (timeTo ?? Infinity)));
  if (filteredTotals[0]) {
    const earliest = filteredTotals[0].createdAt;
    const startPrice = filteredTotals[0].treasury;
    const latest = filteredTotals[filteredTotals.length - 1].createdAt;
    const latestPrice = filteredTotals[filteredTotals.length - 1].treasury;
    const days = Math.ceil(new Date(latest).getDate() - new Date(earliest).getDate()) + 1;
    const change = ((latestPrice - startPrice) / startPrice) * 100;
    const target = dailyPerformanceTarget(targetAPR) * days;
    stats = {
      earliest: earliest.slice(0, 10),
      latest: latest.slice(0, 10),
      days, 
      startPrice: `$ ${numberWithCommas(startPrice.toFixed(0))}`,
      latestPrice: `$ ${numberWithCommas(latestPrice.toFixed(0))}`,
      actual: `${change.toFixed(2)}%`,
      targetForPeriod: `${target.toFixed(2)}%`,
      versusBenchmark: `${(change - target).toFixed(2)}%`,
    };

    type Month = {
      startValue: number,
      endValue: number,
      month: number,
      day: number,
      monthLabel: string,
      monthValue: number,
      performance: number,
      // days: number,
    }

    type MonthPerf = {
      startValue: number,
      endValue: number,
      month: number,
      monthLabel: string,
      performance: number,
      days: number,
    }

    type PartMonth = Pick<Month, "month" | "day" | "monthLabel" | "monthValue">;
    const months = filteredTotals.map(total => ({
        month: new Date(total.createdAt).getMonth(),
        day: new Date(total.createdAt).getDay(),
        ...total,
      })
    );

    const monthlyTotals: PartMonth[] = months.reduce((acc: PartMonth[], curr: any) => {
      const month = new Date(curr.createdAt).getMonth();
      const day = new Date(curr.createdAt).getDay();
      const monthLabel = new Date(curr.createdAt).toLocaleString('default', { month: 'long' });
      const monthValue = curr.treasury;
      return [...acc, { month, day, monthLabel, monthValue }];
    }
    , []);

    const removeDuplicateDays = monthlyTotals.filter((month, index) => {
      if (index === 0) {
        return true;
      } else {
        return month.day !== monthlyTotals[index - 1].day;
      }
    });

    const firstInMonth = removeDuplicateDays.filter((day, index) => {
      return index === 0 || day.month !== removeDuplicateDays[index - 1].month;
    });

    const lastInMonth = removeDuplicateDays.filter((day, index) => {
      return index === removeDuplicateDays.length - 1 || day.month !== removeDuplicateDays[index + 1].month;
    });

    summary = firstInMonth.map((item: PartMonth, i: number) => {
      if (item.month === lastInMonth[i].month) {
        return {
          month: item.month,
          days: lastInMonth[i].day - item.day + 1,
          monthLabel: item.monthLabel,
          startValue: item.monthValue,
          endValue: lastInMonth[i].monthValue,
          performance: ((lastInMonth[i].monthValue - item.monthValue) / item.monthValue) * 100,
          versusTarget: (lastInMonth[i].day - item.day + 1) * dailyPerformanceTarget(targetAPR)
        }
      }
    })
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
            ({ treasury, createdAt, percentageChange, cumulativeChange, _id }) => (
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
