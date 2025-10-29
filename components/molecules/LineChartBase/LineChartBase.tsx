"use client";

import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { LineChartAtom } from "@/components/atoms/LineChartAtom/LineChartAtom";
import { CombinedData } from "@/components/organisms/CoinCompareChart/CoinCompareChart.type";

interface LineChartBaseProps {
  data: CombinedData[];
}

export const LineChartBase = ({ data }: LineChartBaseProps) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <XAxis dataKey="date" />
        <YAxis unit="%" />
        <Tooltip formatter={(v: number) => `${v.toFixed(2)}%`} />
        <Legend />

        <LineChartAtom dataKey="bitcoin" color="#f7931a" name="Bitcoin" />
        <LineChartAtom dataKey="ethereum" color="#f57de5" name="Ethereum" />
        <LineChartAtom dataKey="solana" color="#14f195" name="Solana" />
      </LineChart>
    </ResponsiveContainer>
  );
};
