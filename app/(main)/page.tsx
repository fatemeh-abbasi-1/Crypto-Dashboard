"use client";

import useSWR from "swr";

import Text from "@/components/atoms/Text/Text";
import CoinCard from "@/components/molecules/CoinCard/CoinCard";
import Spinner from "@/components/atoms/Spinner/Spinner";
import CoinCompareChart from "@/components/organisms/CoinCompareChart/CoinCompareChart";

import { fetchCoins } from "@/services/cryptoService";
import { Crypto } from "@/types";

const fetcher = () => fetchCoins(1, 4);

export default function Page() {
  const {
    data: cryptos,
    isLoading,
    error,
  } = useSWR("top-cryptos", fetcher, {
    refreshInterval: 60000,
    revalidateOnFocus: false,
  });

  if (isLoading) return <Spinner />;
  if (error) return <Text className="text-red-400">Error loading data</Text>;

  return (
    <section className="flex flex-col gap-10">
      <div className="flex justify-between">
        {cryptos?.slice(0, 3).map((crypto: Crypto, i: number) => (
          <CoinCard key={i} crypto={crypto} index={i} />
        ))}
      </div>
      <div>
        <CoinCompareChart />
      </div>
    </section>
  );
}
