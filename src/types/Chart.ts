interface BaseChartData {
  id: string;
  color: string;
}

export interface LineData extends BaseChartData {
  data: {
    x: string;
    y: number;
  }[]
}

export interface PieData extends BaseChartData {
  label: string;
  value: number;
}