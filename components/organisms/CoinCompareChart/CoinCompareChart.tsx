"use client";

import { useEffect, useState, useMemo } from "react";
import { CoinData, CombinedData } from "./CoinCompareChart.type";

import Text from "@/components/atoms/Text/Text";
import Title from "@/components/atoms/Title/Title";
import { LineChartBase } from "@/components/molecules/LineChartBase/LineChartBase";
import Spinner from "@/components/atoms/Spinner/Spinner";

const CoinCompareChart = () => {
  const [coins, setCoins] = useState<CoinData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const res = await fetch("/api/coins/chart", {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);

        const data: CoinData[] = await res.json();
        setCoins(data);
      } catch (err) {
        // ✅ Handling type-safe errors
        if (err instanceof DOMException && err.name === "AbortError") return;

        console.error("Fetch error:", err);

        const message =
          err instanceof Error
            ? err.message
            : typeof err === "string"
            ? err
            : "Unknown error";

        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => controller.abort();
  }, []);

  const combinedData = useMemo<CombinedData[]>(() => {
    if (coins.length === 0) return [];
    return coins[0].prices.map((_, i) => ({
      date: coins[0].prices[i].date,
      bitcoin: coins[0].prices[i].change,
      ethereum: coins[1]?.prices[i]?.change ?? 0,
      solana: coins[2]?.prices[i]?.change ?? 0,
    }));
  }, [coins]);

  if (loading) return <Spinner />;
  if (error)
    return (
      <Title variant="h2" color={"red"}>
        {error}
      </Title>
    );
  if (!coins.length) return <Text>No data available</Text>;

  return (
    <div className="bg-white dark:bg-neutral-700 p-4 rounded-2xl shadow w-full">
      <Title variant="h2" className="mb-3">
        Crypto 7-Day Performance (%)
      </Title>
      <LineChartBase data={combinedData} />
    </div>
  );
};

export default CoinCompareChart;
