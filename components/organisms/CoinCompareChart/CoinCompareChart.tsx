"use client";

import { useEffect, useState } from "react";
import { CoinData, CombinedData } from "./CoinCompareChart.type";
import Title from "@/components/atoms/Title/Title";
import { LineChartBase } from "@/components/molecules/LineChartBase/LineChartBase";
import { p } from "framer-motion/client";

export const CoinCompareChart = () => {
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

  if (loading) return <div>loading...</div>;
  if (!coins.length) return <div>No data available</div>;

  const combinedData: CombinedData[] = coins[0].prices.map((_, i) => ({
    date: coins[0].prices[i].date,
    bitcoin: coins[0].prices[i].change,
    ethereum: coins[1]?.prices[i]?.change ?? 0,
    solana: coins[2]?.prices[i]?.change ?? 0,
  }));

  return (
    <div className="bg-white dark:bg-zinc-800 p-4 rounded-2xl shadow w-full">
      <Title variant="h2" className="mb-3">
        Crypto 7-Day Performance (%)
      </Title>
      <LineChartBase data={combinedData} />
    </div>
  );
};
