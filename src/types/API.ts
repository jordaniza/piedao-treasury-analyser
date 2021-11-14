import { Serie } from "@nivo/line";
import { PieData } from "./Chart";
import { AssetEntity, TreasuryEntity } from "./Treasury"

export type SetAction<T> = React.Dispatch<React.SetStateAction<T>>;
export type PartMonth = Pick<Month, "month" | "day" | "monthLabel" | "monthValue">;

export type ApiContextType = {
  /**
   * Caputures values saved from the api call into the shared state,
   * saves prop drilling into nested components.
   */
  lineData: Serie[] | [];
  pieData: PieData[] | [];
  assetData: DisplayAsset[] | [];
  totals: Total[] | [];
  stats: any;
  summary: any[];
  onClick: (id: string) => void;
}

export interface Total extends Pick<TreasuryEntity, "_id" | "treasury" | "createdAt"> {
  /**
   * Summarized daily view of the treasury with percentage change metrics
   */
  percentageChange: number;
  timestamp: number;
}

export interface DisplayAsset extends AssetEntity {
  /**
   * Extends the asset entity with the percentage change metrics
   */
  percentage: number;
  initialValue: number;
  performance: number;
}

export type Month = {
  /**
   * @TODO change this to a more readable summary
   */
  startValue: number,
  endValue: number,
  month: number,
  day: number,
  monthLabel: string,
  monthValue: number,
  performance: number,
}

export type MonthPerf = {
  /**
   * Summary performance of the month
   */
  startValue: number,
  endValue: number,
  month: number,
  monthLabel: string,
  performance: number,
  days: number,
}
