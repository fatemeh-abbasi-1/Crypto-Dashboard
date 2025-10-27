"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// ✅ تایپ داده‌ها
interface NormalizedPoint {
  date: string;
  change: number;
}

interface CoinData {
  id: string;
  prices: NormalizedPoint[];
}

interface CombinedData {
  date: string;
  bitcoin: number;
  ethereum: number;
  solana: number;
}

export default function CoinCompareChart() {
  const [coins, setCoins] = useState<CoinData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/coins/chart")
      .then((res) => res.json())
      .then((data: CoinData[]) => {
        setCoins(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center py-8">Loading chart...</div>;
  if (!coins.length) return <div>No data available</div>;

  // ✅ تایپ‌شده و امن
  const combinedData: CombinedData[] = coins[0].prices.map((_, index) => ({
    date: coins[0].prices[index].date,
    bitcoin: coins[0].prices[index].change,
    ethereum: coins[1]?.prices[index]?.change ?? 0,
    solana: coins[2]?.prices[index]?.change ?? 0,
  }));

  return (
    <div className="w-full h-[400px] bg-white dark:bg-neutral-900 p-4 rounded-2xl shadow">
      <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100">
        Crypto 7-Day Performance (%)
      </h2>

      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={combinedData}>
          <XAxis dataKey="date" />
          <YAxis unit="%" />
          <Tooltip formatter={(value: number) => `${value.toFixed(2)}%`} />
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
    </div>
  );
}
