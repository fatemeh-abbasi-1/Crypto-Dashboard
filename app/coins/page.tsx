"use client";

import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

import Title from "@/components/atoms/Title/Title";
import CoinCard from "@/components/molecules/CoinCard/CoinCard";
import Spinner from "@/components/atoms/Spinner/Spinner";

import { fetchCoins } from "@/services/cryptoService";
import { Crypto } from "@/types";

let page = 1;

const Page = () => {
  const { ref, inView } = useInView({ threshold: 0.1 });
  const [data, setData] = useState<Crypto[]>([]);
  const [loading, setLoading] = useState(false);
  const [end, setEnd] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const getData = async () => {
      if (loading || end) return;

      setLoading(true);
      try {
        const coins = await fetchCoins(page);
        if (coins.length === 0) setEnd(true);
        else {
          setData((prev) => [...prev, ...coins]);
          page++;
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setEnd(true);
      } finally {
        setLoading(false);
      }
    };

    if (inView) timer = setTimeout(() => getData(), 1000);

    return () => clearTimeout(timer);
  }, [inView]);

  return (
    <div className="flex flex-col items-center gap-7">
      <Title variant="h1">Coins List</Title>

      <div className="flex flex-wrap justify-center gap-14">
        {data.map((crypto, i) => (
          <CoinCard key={i} crypto={crypto} index={i} />
        ))}
      </div>

      <div ref={ref} className="h-10 flex items-center justify-center">
        {loading && !end && <Spinner />}
        {end && (
          <p className="text-gray-400 text-sm animate-pulse mt-2">
            🚀 دیگه داده‌ای نیست!
          </p>
        )}
      </div>
    </div>
  );
};

export default Page;
