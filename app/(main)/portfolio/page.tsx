"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useSWR from "swr";

import Title from "@/components/atoms/Title/Title";
import Text from "@/components/atoms/Text/Text";
import Spinner from "@/components/atoms/Spinner/Spinner";
import { PieChartAtom, PieChartData } from "@/components/atoms/PieChartAtom/PieChartAtom";
import Button from "@/components/atoms/Button/Button";

interface PortfolioItem {
  id: number;
  coinId: string;
  coinSymbol: string;
  amount: number;
}

interface CoinPrice {
  id: string;
  symbol: string;
  current_price: number;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function PortfolioPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalValue, setTotalValue] = useState(0);
  const [giftGiven, setGiftGiven] = useState(false);

  // Fetch portfolio
  const { data: portfolioData, mutate: mutatePortfolio } = useSWR(
    session ? "/api/portfolio" : null,
    fetcher
  );

  // Fetch coin prices
  const { data: coinsData } = useSWR(
    portfolio.length > 0 ? "/api/coins?page=1&per_page=100" : null,
    fetcher
  );

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    if (status === "authenticated" && portfolioData) {
      setPortfolio(portfolioData.portfolio || []);
      setLoading(false);

      // Check if user has no assets and give gift (only once)
      const hasAssets = portfolioData.portfolio?.some((p: PortfolioItem) => p.amount > 0);
      if (!giftGiven && !hasAssets) {
        setGiftGiven(true);
        fetch("/api/portfolio/gift", { method: "POST" })
          .then((res) => res.json())
          .then(() => {
            mutatePortfolio();
          })
          .catch(console.error);
      }
    }
  }, [status, portfolioData, router, mutatePortfolio, giftGiven]);

  // Calculate total value and prepare chart data
  useEffect(() => {
    if (portfolio.length > 0 && coinsData) {
      let total = 0;
      const chartData: PieChartData[] = [];

      portfolio.forEach((item) => {
        const coin = coinsData.find(
          (c: CoinPrice) => c.id === item.coinId || c.symbol.toLowerCase() === item.coinSymbol.toLowerCase()
        );
        
        if (coin) {
          const value = item.amount * coin.current_price;
          total += value;
          
          if (value > 0) {
            chartData.push({
              name: item.coinSymbol.toUpperCase(),
              value: value,
              color: getColorForCoin(item.coinSymbol),
            });
          }
        }
      });

      setTotalValue(total);
    } else if (portfolio.length === 0) {
      setTotalValue(0);
    }
  }, [portfolio, coinsData]);

  if (status === "loading" || loading) {
    return <Spinner />;
  }

  if (status === "unauthenticated") {
    return null;
  }

  const chartData: PieChartData[] = [];
  let calculatedTotal = 0;

  portfolio.forEach((item) => {
    if (item.amount > 0 && coinsData) {
      const coin = coinsData.find(
        (c: CoinPrice) => c.id === item.coinId || c.symbol.toLowerCase() === item.coinSymbol.toLowerCase()
      );
      
      if (coin) {
        const value = item.amount * coin.current_price;
        calculatedTotal += value;
        chartData.push({
          name: item.coinSymbol.toUpperCase(),
          value: value,
          color: getColorForCoin(item.coinSymbol),
        });
      }
    }
  });

  return (
    <div className="flex flex-col gap-8 p-6">
      <Title variant="h1">Portfolio</Title>

      <div className="bg-neutral-700 rounded-2xl p-6 shadow-lg">
        <div className="flex flex-col gap-8">
          <div>
            <Text className="text-gray-400 mb-2">Total Portfolio Value</Text>
            <Title variant="h2" className="text-4xl md:text-5xl font-bold text-purple-400">
              ${totalValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </Title>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center">
            {/* Pie Chart */}
            <div className="w-full lg:w-1/2 flex justify-center">
              {chartData.length > 0 ? (
                <PieChartAtom data={chartData} height={300} />
              ) : (
                <div className="w-full h-[300px] flex items-center justify-center bg-neutral-800 rounded-lg">
                  <Text className="text-gray-400">No assets to display</Text>
                </div>
              )}
            </div>

            {/* Legend */}
            <div className="w-full lg:w-1/2">
              {chartData.length > 0 ? (
                <div className="space-y-3">
                  <Text className="text-lg font-semibold mb-4">Asset Breakdown</Text>
                  {portfolio
                    .filter((item) => item.amount > 0)
                    .map((item) => {
                      const coin = coinsData?.find(
                        (c: CoinPrice) => c.id === item.coinId || c.symbol.toLowerCase() === item.coinSymbol.toLowerCase()
                      );
                      const value = coin ? item.amount * coin.current_price : 0;
                      const percentage = calculatedTotal > 0 ? (value / calculatedTotal) * 100 : 0;
                      const color = getColorForCoin(item.coinSymbol);

                      return (
                        <div
                          key={item.id}
                          className="flex items-center gap-4 p-4 bg-neutral-800 rounded-lg"
                        >
                          <div
                            className="w-4 h-4 rounded-full flex-shrink-0"
                            style={{ backgroundColor: color }}
                          />
                          <div className="flex-1">
                            <Text className="font-semibold text-lg">
                              {item.coinSymbol.toUpperCase()}
                            </Text>
                            <Text className="text-sm text-gray-400">
                              Amount: {item.amount.toFixed(6)} {item.coinSymbol.toUpperCase()}
                            </Text>
                          </div>
                          <div className="text-right">
                            <Text className="font-semibold">
                              ${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </Text>
                            <Text className="text-sm text-gray-400">
                              {percentage.toFixed(1)}%
                            </Text>
                          </div>
                        </div>
                      );
                    })}
                </div>
              ) : (
                <div className="p-6 bg-neutral-800 rounded-lg">
                  <Text className="text-gray-300">
                    You have no assets yet. Check back after receiving your welcome gift!
                  </Text>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getColorForCoin(symbol: string): string {
  const colors: Record<string, string> = {
    btc: "#F7931A",
    eth: "#627EEA",
    sol: "#14F195",
    ada: "#0033AD",
    dot: "#E6007A",
    matic: "#8247E5",
  };
  
  return colors[symbol.toLowerCase()] || "#8B5CF6";
}

