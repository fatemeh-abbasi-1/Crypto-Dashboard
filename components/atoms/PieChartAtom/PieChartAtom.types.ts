export interface PieChartData {
  name: string;
  value: number;
  color: string;
}

export interface PieChartAtomProps {
  data: PieChartData[];
  width?: number;
  height?: number;
}


