"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { CombinedData } from "./LineChatBase.type";

interface Props {
  data: CombinedData[];
}

export const LineChartBase = ({ data }: Props) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <XAxis dataKey="date" />
        <YAxis unit="%" />
        <Tooltip formatter={(v: number) => `${v.toFixed(2)}%`} />
        <Legend />
        <Line
          type="monotone"
          dataKey="bitcoin"
          stroke="#f7931a"
          strokeWidth={2}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="ethereum"
          stroke="#3c3c3d"
          strokeWidth={2}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="solana"
          stroke="#14f195"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
