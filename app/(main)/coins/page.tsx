"use client";

import { useEffect, useState, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import { useSearchParams } from "next/navigation";
import { fetchCoins } from "@/services/cryptoService";
import { Crypto } from "@/types";
import CoinCard from "@/components/molecules/CoinCard/CoinCard";
import Spinner from "@/components/atoms/Spinner/Spinner";
import Title from "@/components/atoms/Title/Title";
import Text from "@/components/atoms/Text/Text";

export default function Page() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const { ref, inView } = useInView({ threshold: 0.1 });
  const [data, setData] = useState<Crypto[]>([]);
  const [filteredData, setFilteredData] = useState<Crypto[]>([]);
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

  // Reset and reload when search changes
  useEffect(() => {
    setData([]);
    setPage(1);
    setEnd(false);
    // Load data based on search
    const loadData = async () => {
      setLoading(true);
      try {
        const coins = searchQuery
          ? await fetch(`/api/coins?search=${encodeURIComponent(searchQuery)}`).then((res) => res.json())
          : await fetchCoins(1);
        
        if (Array.isArray(coins)) {
          setData(coins);
          if (searchQuery || coins.length === 0) {
            setEnd(true);
          }
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setEnd(true);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [searchQuery]);

  // Update filtered data when data changes
  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  // Infinite scroll for non-search mode
  useEffect(() => {
    if (searchQuery || !inView || loading || end) return;

    const timer = setTimeout(() => {
      getData();
    }, delay);

    return () => clearTimeout(timer);
  }, [inView, delay, getData, loading, end, searchQuery]);

  return (
    <div className="flex flex-col items-center gap-4 md:gap-7">
      <Title variant="h1" className="text-2xl md:text-3xl">
        {searchQuery ? `Search Results for "${searchQuery}"` : "Coins List"}
      </Title>

      {searchQuery && filteredData.length === 0 && !loading && (
        <Text className="text-gray-400">No coins found matching your search.</Text>
      )}

      <div className="flex flex-wrap justify-center gap-4 md:gap-8 lg:gap-14 w-full">
        {filteredData.map((crypto, i) => (
          <CoinCard key={i} crypto={crypto} index={i} />
        ))}
      </div>

      {!searchQuery && (
        <div ref={ref} className="h-10 flex items-center justify-center">
          {loading && !end && <Spinner />}
          {end && <Text color="gray">No more data!</Text>}
        </div>
      )}
    </div>
  );
}
