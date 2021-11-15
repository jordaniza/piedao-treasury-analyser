import React, { useEffect, useState, createContext, Children } from 'react';
import axios, { AxiosResponse } from 'axios';
import { TreasuryEntity } from '../types/Treasury';
import { Serie } from '@nivo/line';
import { ApiContextType, DisplayAsset, MonthlySummary, HeadlineStats, Total } from '../types/API';
import { PieData } from '../types/Chart';
import { generateLineTargets, generateLineTotals } from '../services/line';
import { computeTotals } from '../services/totals';
import { generateAssetData, generatePieData } from '../services/assets';
import { generateMonthlySummary, getStats, getTotalsByMonthAndDay } from '../services/summary';

export const ApiContext = createContext<ApiContextType>({
  lineData: [],
  pieData: [],
  assetData: [],
  totals: [],
  stats: {} as HeadlineStats,
  monthlySummary: [],
  onClick: () => {},
});

const ApiContextProvider = ({
  days,
  targetAPR,
  children,
  refresh,
}:{
  days: number;
  targetAPR: number;
  children: React.ReactNode;
  refresh: number;
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

  const getData = () => {
    axios.get(`http://localhost:3000/treasury?days=${days ?? 7}`)
      .then((res: AxiosResponse<TreasuryEntity[]>) => {
        setTreasury(res.data);
        const totals = computeTotals(res.data);
        setTotals(totals);
        generateLineData(totals);
      }
    );
  };

  useEffect(() => {
    getData();
  }, [refresh]);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (treasury.length > 0) {
      const mostRecentRecord = treasury[treasury.length - 1];
      updateAssetDataFromId(mostRecentRecord._id);
    }
  }, [treasury])

  const updateAssetDataFromId = (id: string) => {
    const selectedRecord = treasury.find(({ _id }) => _id === id);
    if (selectedRecord) {
      const baseAssets = treasury[0].underlying_assets;
      const _assetData = generateAssetData(selectedRecord, baseAssets);
      setAssetData(_assetData);
      setPieData(generatePieData(selectedRecord));
    }
  };

  let stats = {} as HeadlineStats;
  let monthlySummary: MonthlySummary[] = [];

  if (totals[0]) {
    stats = getStats(totals, targetAPR);
    const totalsByMonthAndDay = getTotalsByMonthAndDay(totals);
    monthlySummary = generateMonthlySummary(totalsByMonthAndDay, targetAPR);
  }

  return (
    <ApiContext.Provider value={{
      lineData,
      pieData,
      assetData,
      totals,
      stats,
      monthlySummary,
      onClick: updateAssetDataFromId,
    }}>
      { children }
    </ApiContext.Provider>
  );
};

export default ApiContextProvider
