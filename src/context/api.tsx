import React, { useEffect, useState, createContext, Children } from 'react';
import axios, { AxiosResponse } from 'axios';
import { TreasuryEntity } from '../types/Treasury';
import { Serie } from '@nivo/line';
import { ApiContextType, DisplayAsset, Total } from '../types/API';
import { computeTotals, generateAssetData, generateLineTargets, generateLineTotals, generateMonthlySummary, generatePieData, getSummaryStatistics, getTotalsByMonthAndDay } from '../services/API';
import { PieData } from '../types/Chart';

export const ApiContext = createContext<ApiContextType>({
  lineData: [],
  pieData: [],
  assetData: [],
  totals: [],
  stats: {},
  summary: [],
  onClick: () => {},
});

const ApiContextProvider = ({
  timeFrom,
  timeTo,
  targetAPR,
  children,
}:{
  timeFrom: number;
  timeTo: number | null;
  targetAPR: number;
  children: React.ReactNode;
}): JSX.Element => {
  const [treasury, setTreasury] = useState<TreasuryEntity[]>([]);
  const [totals, setTotals] = useState<Total[]>([]);
  const [assetData, setAssetData] = useState<DisplayAsset[]>([]);
  const [lineData, setLineData] = useState<Serie[]>([]);
  const [pieData, setPieData] = useState<PieData[]>([]);

  const generateLineData = (total: Total[]): void => {
    const lineData: Serie[] = [
      generateLineTotals(total),
      generateLineTargets(total, targetAPR)
    ];
    setLineData(lineData);
  };

  // useEffect(() => {
  //   generateLineData(totals)
  // }, [targetAPR]);

  useEffect(() => {
    axios.get('http://localhost:3000/treasury').then((res: AxiosResponse<TreasuryEntity[]>) => {
      setTreasury(res.data);
      if (treasury && treasury[0]?.underlying_assets) {
        setPieData(generatePieData(treasury[treasury.length - 3]));
        onClick(treasury[treasury.length - 1]._id);
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
      const _assetData = generateAssetData(selectedRecord, baseAssets);
      setAssetData(_assetData);
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
    const totalsByMonthAndDay = getTotalsByMonthAndDay(totals);
    summary = generateMonthlySummary(totalsByMonthAndDay, targetAPR);
  }

  return (
    <ApiContext.Provider value={{
      lineData,
      pieData,
      assetData,
      totals: filteredTotals,
      stats,
      summary,
      onClick,
    }}>
      { children }
    </ApiContext.Provider>
  );
};

export default ApiContextProvider
