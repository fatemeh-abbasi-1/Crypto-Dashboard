"use client";

import { useEffect, useState, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import { fetchCoins } from "@/services/cryptoService";
import { Crypto } from "@/types";
import CoinCard from "@/components/molecules/CoinCard/CoinCard";
import Spinner from "@/components/atoms/Spinner/Spinner";
import Title from "@/components/atoms/Title/Title";
import Text from "@/components/atoms/Text/Text";

export default function Page() {
  const { ref, inView } = useInView({ threshold: 0.1 });
  const [data, setData] = useState<Crypto[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [end, setEnd] = useState(false);

  const [delay, setDelay] = useState(2000);

  const getData = useCallback(async () => {
    if (loading || end) return;
    setLoading(true);
    try {
      const coins = await fetchCoins(page);
      if (!Array.isArray(coins) || coins.length === 0) {
        setEnd(true);
      } else {
        setData((prev) => [...prev, ...coins]);
        setPage((p) => p + 1);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setEnd(true);
    } finally {
      setLoading(false);
    }
  }, [page, loading, end]);

  useEffect(() => {
    if (!inView || loading || end) return;

    const timer = setTimeout(() => {
      getData();
    }, delay);

    return () => clearTimeout(timer);
  }, [inView, delay, getData, loading, end]);

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
        {end && <Text color="gray">No more data!</Text>}
      </div>
    </div>
  );
}
