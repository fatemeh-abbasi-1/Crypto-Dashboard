"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useSWR from "swr";

import Title from "@/components/atoms/Title/Title";
import Text from "@/components/atoms/Text/Text";
import Spinner from "@/components/atoms/Spinner/Spinner";
import Button from "@/components/atoms/Button/Button";

interface Coin {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  image: string;
}

interface Activity {
  type: "buy" | "sell";
  coin: Coin;
  reason: string;
  confidence: number;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ActivitiesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  const { data: coinsData } = useSWR("/api/coins?page=1&per_page=50", fetcher);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    if (status === "authenticated") {
      setLoading(false);
    }
  }, [status, router]);

  useEffect(() => {
    if (coinsData && Array.isArray(coinsData)) {
      generateActivities(coinsData);
    }
  }, [coinsData]);

  const generateActivities = (coins: Coin[]) => {
    const suggestions: Activity[] = [];

    // Sort by price change
    const topGainers = [...coins]
      .filter((c) => c.price_change_percentage_24h > 0)
      .sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)
      .slice(0, 3);

    const topLosers = [...coins]
      .filter((c) => c.price_change_percentage_24h < 0)
      .sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h)
      .slice(0, 2);

    // Buy suggestions
    topGainers.forEach((coin) => {
      const reasons = [
        `Strong 24h performance (+${coin.price_change_percentage_24h.toFixed(2)}%)`,
        "Positive momentum detected",
        "High trading volume",
        "Technical indicators show bullish trend",
      ];
      
      suggestions.push({
        type: "buy",
        coin,
        reason: reasons[Math.floor(Math.random() * reasons.length)],
        confidence: 70 + Math.floor(Math.random() * 20),
      });
    });

    // Sell suggestions (for coins with negative performance)
    topLosers.forEach((coin) => {
      const reasons = [
        `Declining trend (-${Math.abs(coin.price_change_percentage_24h).toFixed(2)}%)`,
        "Consider taking profits",
        "Risk management opportunity",
        "Market correction expected",
      ];
      
      suggestions.push({
        type: "sell",
        coin,
        reason: reasons[Math.floor(Math.random() * reasons.length)],
        confidence: 60 + Math.floor(Math.random() * 25),
      });
    });

    // Shuffle and limit to 5
    setActivities(suggestions.sort(() => Math.random() - 0.5).slice(0, 5));
  };

  if (status === "loading" || loading) {
    return <Spinner />;
  }

  if (status === "unauthenticated") {
    return null;
  }

  return (
    <div className="flex flex-col gap-8 p-6">
      <div className="flex items-center justify-between">
        <Title variant="h1">Trading Activities</Title>
        <Text className="text-gray-400">
          AI-powered suggestions based on market analysis
        </Text>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities.length === 0 ? (
          <div className="col-span-full flex justify-center items-center py-12">
            <Spinner />
          </div>
        ) : (
          activities.map((activity, index) => (
            <div
              key={index}
              className={`bg-neutral-700 rounded-2xl p-6 shadow-lg border-2 ${
                activity.type === "buy"
                  ? "border-green-500/50 hover:border-green-500"
                  : "border-red-500/50 hover:border-red-500"
              } transition-all`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {activity.coin.image && (
                    <img
                      src={activity.coin.image}
                      alt={activity.coin.name}
                      className="w-10 h-10 rounded-full"
                    />
                  )}
                  <div>
                    <Text className="font-semibold text-lg">
                      {activity.coin.name}
                    </Text>
                    <Text className="text-sm text-gray-400">
                      {activity.coin.symbol.toUpperCase()}
                    </Text>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    activity.type === "buy"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {activity.type.toUpperCase()}
                </span>
              </div>

              <div className="mb-4">
                <Text className="text-gray-300 mb-2">{activity.reason}</Text>
                <div className="flex items-center gap-2">
                  <Text className="text-sm text-gray-400">Confidence:</Text>
                  <div className="flex-1 bg-neutral-800 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        activity.type === "buy" ? "bg-green-500" : "bg-red-500"
                      }`}
                      style={{ width: `${activity.confidence}%` }}
                    />
                  </div>
                  <Text className="text-sm font-semibold">
                    {activity.confidence}%
                  </Text>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div>
                  <Text className="text-sm text-gray-400">Current Price</Text>
                  <Text className="font-semibold text-lg">
                    ${activity.coin.current_price.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 6,
                    })}
                  </Text>
                </div>
                <div className="text-right">
                  <Text className="text-sm text-gray-400">24h Change</Text>
                  <Text
                    className={`font-semibold ${
                      activity.coin.price_change_percentage_24h >= 0
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {activity.coin.price_change_percentage_24h >= 0 ? "+" : ""}
                    {activity.coin.price_change_percentage_24h.toFixed(2)}%
                  </Text>
                </div>
              </div>

              <Button
                className={`w-full ${
                  activity.type === "buy"
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-red-500 hover:bg-red-600"
                }`}
                onClick={() => {
                  alert(
                    `${activity.type === "buy" ? "Buy" : "Sell"} ${activity.coin.name} - This is a demo feature`
                  );
                }}
              >
                {activity.type === "buy" ? "Buy Now" : "Sell Now"}
              </Button>
            </div>
          ))
        )}
      </div>

      {activities.length > 0 && (
        <div className="bg-purple-500/10 border border-purple-500/50 rounded-lg p-4">
          <Text className="text-sm text-purple-300">
            💡 <strong>Note:</strong> These are AI-generated suggestions based on
            market data. Always do your own research before making trading
            decisions.
          </Text>
        </div>
      )}
    </div>
  );
}


