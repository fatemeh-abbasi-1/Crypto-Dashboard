"use client";

import useSWR from "swr";

import Text from "@/components/atoms/Text/Text";
import CoinCard from "@/components/molecules/CoinCard/CoinCard";
import Spinner from "@/components/atoms/Spinner/Spinner";

import { fetchCoins } from "@/services/cryptoService";
import { Crypto } from "@/types";

const fetcher = () => fetchCoins(1);

export default function Page() {
  const {
    data: cryptos,
    isLoading,
    error,
  } = useSWR("top-cryptos", fetcher, {
    refreshInterval: 60000, // 🔁 هر 60 ثانیه آپدیت میشه
    revalidateOnFocus: false,
  });

  if (isLoading) return <Spinner />;
  if (error) return <Text className="text-red-400">Error loading data</Text>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cryptos.slice(0, 3).map((crypto: Crypto, i: number) => (
        <CoinCard key={i} crypto={crypto} index={i} />
      ))}
    </div>
  );
}
