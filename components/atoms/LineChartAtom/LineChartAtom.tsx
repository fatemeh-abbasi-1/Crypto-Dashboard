"use client";

import { Line } from "recharts";

import { LineChartAtomProps } from "./LineChartAtom.types";

export const LineChartAtom = ({ dataKey, color, name }: LineChartAtomProps) => (
  <Line
    type="monotone"
    dataKey={dataKey}
    stroke={color}
    strokeWidth={2}
    dot={false}
    name={name}
  />
);
