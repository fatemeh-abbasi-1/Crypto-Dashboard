"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useSWR from "swr";

import Text from "@/components/atoms/Text/Text";
import Title from "@/components/atoms/Title/Title";
import CoinCard from "@/components/molecules/CoinCard/CoinCard";
import Spinner from "@/components/atoms/Spinner/Spinner";
import CoinCompareChart from "@/components/organisms/CoinCompareChart/CoinCompareChart";
import { PieChartAtom, PieChartData } from "@/components/atoms/PieChartAtom/PieChartAtom";
import Button from "@/components/atoms/Button/Button";

import { fetchCoins } from "@/services/cryptoService";
import { Crypto } from "@/types";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface PortfolioItem {
  id: number;
  coinId: string;
  coinSymbol: string;
  amount: number;
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

export default function Page() {
  const { data: session } = useSession();
  const router = useRouter();
  
  const {
    data: cryptos,
    isLoading: cryptosLoading,
    error: cryptosError,
  } = useSWR("top-cryptos", () => fetchCoins(1, 4), {
    refreshInterval: 60000,
    revalidateOnFocus: false,
  });

  // Fetch portfolio for authenticated users
  const { data: portfolioData } = useSWR(
    session ? "/api/portfolio" : null,
    fetcher
  );

  // Fetch coin prices for portfolio calculation
  const { data: coinsData } = useSWR(
    session && portfolioData?.portfolio?.length > 0 ? "/api/coins?page=1&per_page=100" : null,
    fetcher
  );

  // Calculate portfolio chart data
  const portfolioChartData: PieChartData[] = [];
  let totalPortfolioValue = 0;

  if (session && portfolioData?.portfolio && coinsData) {
    portfolioData.portfolio.forEach((item: PortfolioItem) => {
      if (item.amount > 0) {
        const coin = coinsData.find(
          (c: any) => c.id === item.coinId || c.symbol.toLowerCase() === item.coinSymbol.toLowerCase()
        );
        if (coin) {
          const value = item.amount * coin.current_price;
          totalPortfolioValue += value;
          portfolioChartData.push({
            name: item.coinSymbol.toUpperCase(),
            value: value,
            color: getColorForCoin(item.coinSymbol),
          });
        }
      }
    });
  }

  if (cryptosLoading) return <Spinner />;
  if (cryptosError) return <Text className="text-red-400">Error loading data</Text>;

  return (
    <section className="flex flex-col gap-6 md:gap-10">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl p-6 md:p-8">
        <Title variant="h1" className="mb-2">Welcome to Crypto Dashboard</Title>
        <Text className="text-gray-300">
          Your comprehensive cryptocurrency tracking and portfolio management platform
        </Text>
      </div>

      {/* Top 3 Coins Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <Title variant="h2">Top Cryptocurrencies</Title>
          <Link href="/coins">
            <Button size="small" className="w-auto px-4">
              View All
            </Button>
          </Link>
        </div>
        <div className="flex flex-col sm:flex-row justify-between gap-4 md:gap-6">
          {cryptos?.slice(0, 3).map((crypto: Crypto, i: number) => (
            <CoinCard key={i} crypto={crypto} index={i} />
          ))}
        </div>
      </div>

      {/* Portfolio Summary Section */}
      {session && (
        <div className="bg-neutral-700 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <Title variant="h2">Portfolio Summary</Title>
            <Link href="/portfolio">
              <Button size="small" className="w-auto px-4">
                View Details
              </Button>
            </Link>
          </div>
          {portfolioChartData.length > 0 ? (
            <div className="flex flex-col lg:flex-row gap-6 items-center">
              <div className="w-full lg:w-1/2 flex justify-center">
                <PieChartAtom data={portfolioChartData} height={250} />
              </div>
              <div className="w-full lg:w-1/2">
                <div className="mb-4">
                  <Text className="text-gray-400 mb-2">Total Portfolio Value</Text>
                  <Title variant="h3" className="text-3xl text-purple-400">
                    ${totalPortfolioValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </Title>
                </div>
                <div className="space-y-2">
                  {portfolioChartData.slice(0, 3).map((item, index) => {
                    const percentage = (item.value / totalPortfolioValue) * 100;
                    return (
                      <div key={index} className="flex items-center gap-3 p-3 bg-neutral-800 rounded-lg">
                        <div
                          className="w-4 h-4 rounded-full flex-shrink-0"
                          style={{ backgroundColor: item.color }}
                        />
                        <div className="flex-1">
                          <Text className="font-semibold">{item.name}</Text>
                          <Text className="text-sm text-gray-400">{percentage.toFixed(1)}%</Text>
                        </div>
                        <Text className="font-semibold">
                          ${item.value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </Text>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <Text className="text-gray-400 mb-4">You have no assets yet</Text>
              <Link href="/portfolio">
                <Button size="small" className="w-auto">
                  Start Building Portfolio
                </Button>
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Chart Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <Title variant="h2">Market Performance</Title>
          <Link href="/activities">
            <Button size="small" className="w-auto px-4">
              View Activities
            </Button>
          </Link>
        </div>
        <div className="w-full overflow-x-auto">
          <CoinCompareChart />
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link href="/coins" className="bg-neutral-700 rounded-xl p-6 hover:bg-neutral-600 transition-colors">
          <Title variant="h3" className="mb-2">Coins</Title>
          <Text className="text-gray-400">Browse all cryptocurrencies</Text>
        </Link>
        {session && (
          <>
            <Link href="/portfolio" className="bg-neutral-700 rounded-xl p-6 hover:bg-neutral-600 transition-colors">
              <Title variant="h3" className="mb-2">Portfolio</Title>
              <Text className="text-gray-400">Manage your assets</Text>
            </Link>
            <Link href="/activities" className="bg-neutral-700 rounded-xl p-6 hover:bg-neutral-600 transition-colors">
              <Title variant="h3" className="mb-2">Activities</Title>
              <Text className="text-gray-400">Trading suggestions</Text>
            </Link>
            <Link href="/profile" className="bg-neutral-700 rounded-xl p-6 hover:bg-neutral-600 transition-colors">
              <Title variant="h3" className="mb-2">Profile</Title>
              <Text className="text-gray-400">View your account</Text>
            </Link>
          </>
        )}
      </div>
    </section>
  );
}
